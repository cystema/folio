import { useState, useEffect, useCallback, useRef } from 'react';

// Grid configuration (must match your generation parameters)
const P_MIN = -15;
const P_MAX = 15;
const STEP = 3;
const SIZE = 256;

// Cache for preloaded images
const imageCache = new Map();

const centerImage = '/faces/gaze_px0p0_py0p0_256.webp';

function canUseInteractiveGaze() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return hasFinePointer && !prefersReducedMotion;
}

function runWhenIdle(callback) {
  if (typeof window === 'undefined') {
    return undefined;
  }

  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout: 1200 });
  }

  return window.setTimeout(callback, 160);
}

function cancelIdleWork(handle) {
  if (handle === undefined || typeof window === 'undefined') {
    return;
  }

  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
}

function preloadImage(imagePath) {
  if (imageCache.has(imagePath)) {
    return;
  }

  const img = new Image();
  imageCache.set(imagePath, img);
  img.src = imagePath;
}

/**
 * Converts normalized coordinates [-1, 1] to grid coordinates
 */
function quantizeToGrid(val) {
  const raw = P_MIN + (val + 1) * (P_MAX - P_MIN) / 2; // [-1,1] -> [-15,15]
  const snapped = Math.round(raw / STEP) * STEP;
  return Math.max(P_MIN, Math.min(P_MAX, snapped));
}

/**
 * Converts grid coordinates to filename format
 * Files use format: gaze_px9p0_py15p0_256.webp (with p0 for .0 decimal)
 */
function gridToFilename(px, py) {
  const sanitize = (val) => {
    // Convert to float format (e.g., 9 -> "9p0", -15 -> "m15p0")
    const absVal = Math.abs(val);
    const prefix = val < 0 ? 'm' : '';
    return `${prefix}${absVal}p0`;
  };
  return `gaze_px${sanitize(px)}_py${sanitize(py)}_${SIZE}.webp`;
}

/**
 * Custom hook for gaze tracking
 * @param {React.RefObject} containerRef - Reference to the container element
 * @param {string} basePath - Base path to face images (default: '/faces/')
 * @returns {Object} { currentImage, isLoading, error }
 */
export function useGazeTracking(containerRef, basePath = '/faces/') {
  // Start with center gaze as default
  const [currentImage, setCurrentImage] = useState(`${basePath}gaze_px0p0_py0p0_${SIZE}.webp`);
  const isLoading = false;
  const error = null;
  const currentImageRef = useRef(currentImage);
  const frameRef = useRef(undefined);
  const idleWorkRef = useRef(undefined);

  const preloadNearbyImages = useCallback((px, py) => {
    cancelIdleWork(idleWorkRef.current);
    idleWorkRef.current = runWhenIdle(() => {
      for (let x = px - STEP; x <= px + STEP; x += STEP) {
        for (let y = py - STEP; y <= py + STEP; y += STEP) {
          if (x < P_MIN || x > P_MAX || y < P_MIN || y > P_MAX) {
            continue;
          }

          preloadImage(`${basePath}${gridToFilename(x, y)}`);
        }
      }
    });
  }, [basePath]);

  const updateGaze = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Guard against zero dimensions (component not yet rendered)
    if (rect.width === 0 || rect.height === 0) {
      // Set default center gaze image
      setCurrentImage(`${basePath}gaze_px0p0_py0p0_${SIZE}.webp`);
      return;
    }
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Convert to normalized coordinates [-1, 1]
    const nx = (clientX - centerX) / (rect.width / 2);
    const ny = (clientY - centerY) / (rect.height / 2);
    
    // Clamp to [-1, 1] range
    // Invert Y axis: screen Y increases downward, but face images expect Y up
    const clampedX = Math.max(-1, Math.min(1, nx));
    const clampedY = Math.max(-1, Math.min(1, -ny));
    
    // Convert to grid coordinates
    const px = quantizeToGrid(clampedX);
    const py = quantizeToGrid(clampedY);
    
    // Generate filename
    const filename = gridToFilename(px, py);
    const imagePath = `${basePath}${filename}`;

    if (currentImageRef.current !== imagePath) {
      currentImageRef.current = imagePath;
      setCurrentImage(imagePath);
    }

    preloadNearbyImages(px, py);
  }, [basePath, containerRef, preloadNearbyImages]);

  const handlePointerMove = useCallback((event) => {
    if (frameRef.current !== undefined) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = undefined;
      updateGaze(event.clientX, event.clientY);
    });
  }, [updateGaze]);

  useEffect(() => {
    const centerPath = basePath === '/faces/' ? centerImage : `${basePath}gaze_px0p0_py0p0_${SIZE}.webp`;
    preloadImage(centerPath);
    preloadNearbyImages(0, 0);

    return () => {
      cancelIdleWork(idleWorkRef.current);
    };
  }, [basePath, preloadNearbyImages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canUseInteractiveGaze()) return;

    // Listen globally on window so face follows cursor everywhere on the page
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Set initial center gaze
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    updateGaze(centerX, centerY);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);

      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [containerRef, handlePointerMove, updateGaze]);

  return { currentImage, isLoading, error };
}

export default useGazeTracking;
