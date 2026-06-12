import React from 'react';

interface GlobalCanvasWrapperProps {
  children: React.ReactNode;
}

export const GlobalCanvasWrapper: React.FC<GlobalCanvasWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative isolate">

      {/* Ambient mesh */}
      <div
        className="canvas-ambient-mesh"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grid */}
      <div
        className="canvas-grid-matrix"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          // opacity: 1,
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 min-h-screen">
        {children}
      </div>

    </div>
  );
};