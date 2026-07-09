"use client"

import React, { useRef } from "react";
import useGazeTracking from "../hooks/useGazeTracking";
import "./FaceTracker.css";

export default function FaceTracker({
  className = "",
  basePath = "/faces/",
  showDebug = false,
}) {
  const containerRef = useRef(null);
  const { currentImage, isLoading, error } = useGazeTracking(containerRef, basePath);

  return (
    <div
      ref={containerRef}
      className={`face-tracker ${className}`}
      aria-hidden="true"
    >
      {currentImage && !error && (
        <img
          src={currentImage}
          alt=""
          className="face-image"
        />
      )}

      {isLoading && <div className="face-loading" />}
      {error && <div className="face-tracker-error" />}

      {showDebug && (
        <div className="face-debug">
          <div>Image: {currentImage?.split('/').pop()}</div>
        </div>
      )}
    </div>
  );
}
