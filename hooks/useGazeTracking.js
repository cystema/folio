import { useState, useEffect, useCallback, useRef } from 'react';

// Grid configuration (must match your generation parameters)
const P_MIN = -15;
const P_MAX = 15;
const STEP = 3;
const SIZE = 256;

// Cache for preloaded images
const imageCache = new Map();

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const preloadedRef = useRef(false);

  // Preload all gaze images on mount
  useEffect(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;

    const totalImages = Math.pow((P_MAX - P_MIN) / STEP + 1, 2);
    let loadedCount = 0;

    for (let px = P_MIN; px <= P_MAX; px += STEP) {
      for (let py = P_MIN; py <= P_MAX; py += STEP) {
        const filename = gridToFilename(px, py);
        const imagePath = `${basePath}${filename}`;
        
        // Skip if already cached
        if (imageCache.has(imagePath)) {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          continue;
        }

        const img = new Image();
        img.onload = () => {
          imageCache.set(imagePath, img);
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
        };
        img.src = imagePath;
      }
    }
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
    
    setCurrentImage(imagePath);
  }, [basePath]);

  const handleMouseMove = useCallback((e) => {
    updateGaze(e.clientX, e.clientY);
  }, [updateGaze]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateGaze(touch.clientX, touch.clientY);
    }
  }, [updateGaze]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Listen globally on window so face follows cursor everywhere on the page
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Set initial center gaze
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    updateGaze(centerX, centerY);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove, updateGaze]);

  return { currentImage, isLoading, error };
}

export default useGazeTracking;

