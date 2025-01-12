"use client";
import React, { useState } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import Canvas from "../_components/Canvas";
import DiagramLeftSidebar from "../_components/DiagramLeftSidebar";
import DiagramRightSidebar from "../_components/DiagramRightSidebar";

const Workspace: React.FC = () => {
  const initialCanvasWidth = 800;
  const initialCanvasHeight = 600;
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1); // Initialize zoom state
  const [triggerSave, setTriggerSave] = useState(false);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Limit zoom-in
  };

  // In Workspace component

  const handleZoomOut = () => {
    // Calculate the zoom-out limit to prevent crossing the initial size
    setZoom((prevZoom) => {
      const newZoom = prevZoom - 0.1;
      const minZoom = Math.max(
        initialCanvasWidth / 800,
        initialCanvasHeight / 600
      );
      return Math.max(newZoom, minZoom); // Limit zoom-out
    });
  };
  const onAICreate = () => {
    console.log("AI Create button clicked");
  };

  return (
    <div className="p-0">
      {/* Workspace Header */}
      <WorkSpaceHeader onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

      {/* Workspace Layout */}
      <div className="grid grid-cols-12 relative">
        {/* Left Side Panel */}
        <div className="col-span-2 h-screen border-l relative z-10">
          <DiagramLeftSidebar
            onShapeSelect={setSelectedShape}
            className="col-span-2 h-screen border-r"
          />
        </div>

        {/* Whiteboard/Canvas */}
        <div className="col-span-8 h-screen border-l border-r">
          <Canvas
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
            zoom={zoom}
            setZoom={setZoom}
          />
        </div>

        {/* Right Side Panel */}
        <DiagramRightSidebar
          onAICreate={onAICreate}
          className="col-span-2 h-screen border-r"
        />
      </div>
    </div>
  );
};

export default Workspace;
