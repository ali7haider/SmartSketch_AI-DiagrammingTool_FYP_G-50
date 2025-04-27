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
  const [shapes, setShapes] = useState<any[]>([]); // Lifted shape state
  const [codeContent, setCodeContent] = useState<string>("{}");
  const [fileData, setFileData] = useState<false>();

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Limit zoom-in
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => {
      const newZoom = prevZoom - 0.1;
      const minZoom = Math.max(
        initialCanvasWidth / 800,
        initialCanvasHeight / 600
      );
      return Math.max(newZoom, minZoom); // Limit zoom-out
    });
  };

  // Update this function to parse JSON and update shapes
  const onAICreate = (input: any) => {
    try {
      const parsedShapes = Array.isArray(input) ? input : JSON.parse(input);
      console.debug("Parsed shapes from AI input:", parsedShapes);
      setShapes(parsedShapes); // Update the shapes state
      console.log("Updated shapes state:", parsedShapes); // Debug log
      setCodeContent(JSON.stringify(parsedShapes, null, 2));
    } catch (error) {
      console.error("Invalid JSON format:", error);
      alert("Invalid JSON format. Please correct it and try again.");
    }
  };

  const handleDeleteShape = () => {
    if (selectedShape) {
      setShapes((prevShapes) =>
        prevShapes.filter((shape) => shape.id !== selectedShape)
      );
      setSelectedShape(null);
    }
  };

  return (
    <div className="p-0">
      {/* Workspace Header */}
      <WorkSpaceHeader
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDelete={handleDeleteShape} // Updated delete
      />

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
        <div className="col-span-7 h-screen border-l border-r">
          <Canvas
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
            zoom={zoom}
            setZoom={setZoom}
            shapes={shapes} // Pass lifted state
            setShapes={setShapes} // Pass setter
          />
        </div>

        {/* Right Side Panel */}
        <DiagramRightSidebar
          onAICreate={onAICreate} // Updated to handle JSON input
          codeContent={codeContent} // Pass current JSON code
          className="col-span-3 h-screen border-r"
          updateCode={setCodeContent} // Update JSON code dynamically
        />
      </div>
    </div>
  );
};

export default Workspace;