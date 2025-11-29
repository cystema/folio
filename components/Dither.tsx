"use client"

/* eslint-disable react/no-unknown-property */
import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const ditherVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const ditherFragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform vec3 color1;
uniform vec3 color2;
uniform float pixelSize;
uniform float colorSteps;
varying vec2 vUv;

// Bayer matrix for dithering
float bayerMatrix4x4[16] = float[16](
  0.0/16.0, 8.0/16.0, 2.0/16.0, 10.0/16.0,
  12.0/16.0, 4.0/16.0, 14.0/16.0, 6.0/16.0,
  3.0/16.0, 11.0/16.0, 1.0/16.0, 9.0/16.0,
  15.0/16.0, 7.0/16.0, 13.0/16.0, 5.0/16.0
);

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for(int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  
  // Create animated waves
  vec2 waveUv = uv * 3.0 + time * 0.1;
  float wave1 = fbm(waveUv);
  float wave2 = fbm(waveUv + vec2(1.7, 9.2));
  float wave = wave1 + wave2;
  
  // Mix colors based on wave
  vec3 color = mix(color1, color2, wave);
  
  // Apply pixelation
  vec2 pixelUv = floor(uv * resolution / pixelSize) * pixelSize / resolution;
  
  // Apply dithering
  vec2 ditherCoord = floor(mod(uv * resolution / pixelSize, 4.0));
  int ditherIndex = int(ditherCoord.y) * 4 + int(ditherCoord.x);
  float threshold = bayerMatrix4x4[ditherIndex];
  
  // Quantize colors
  color += (threshold - 0.5) * 0.1;
  color = floor(color * colorSteps) / colorSteps;
  
  gl_FragColor = vec4(color, 1.0);
}
`

function DitheredPlane({ isDarkMode }) {
  const meshRef = useRef()
  const { viewport, size } = useThree()

  const uniforms = useRef({
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(size.width, size.height) },
    color1: { value: new THREE.Color(isDarkMode ? 0.1 : 0.9, isDarkMode ? 0.1 : 0.9, isDarkMode ? 0.1 : 0.9) },
    color2: { value: new THREE.Color(isDarkMode ? 0.8 : 0.2, isDarkMode ? 0.4 : 0.4, isDarkMode ? 0.9 : 0.8) },
    pixelSize: { value: 4.0 },
    colorSteps: { value: 6.0 },
  })

  useFrame(({ clock }) => {
    if (meshRef.current) {
      uniforms.current.time.value = clock.getElapsedTime()
      uniforms.current.resolution.value.set(size.width, size.height)

      // Update colors based on theme
      uniforms.current.color1.value.setRGB(isDarkMode ? 0.1 : 0.9, isDarkMode ? 0.1 : 0.9, isDarkMode ? 0.1 : 0.9)
      uniforms.current.color2.value.setRGB(isDarkMode ? 0.8 : 0.2, isDarkMode ? 0.4 : 0.4, isDarkMode ? 0.9 : 0.8)
    }
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={ditherVertexShader}
        fragmentShader={ditherFragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

export default function Dither({ isDarkMode = true }) {
  return (
    <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 0, 1] }} dpr={1}>
      <DitheredPlane isDarkMode={isDarkMode} />
    </Canvas>
  )
}
