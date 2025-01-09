"use client";
import React, { useState } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import Canvas from "../_components/Canvas";
import DiagramLeftSidebar from "../_components/DiagramLeftSidebar";
import DiagramRightSidebar from "../_components/DiagramRightSidebar";

function Workspace({ params }: any) {
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [triggerSave, setTriggerSave] = useState(false);

  const onAICreate = () => {
    console.log("AI Create button clicked");
  };

  return (
    <div className="p-0">
      <WorkSpaceHeader
        className="p-0"
        onSave={() => setTriggerSave(!triggerSave)}
      />

      {/* Workspace Layout */}
      <div className="grid grid-cols-12 relative">
        {/* Left Side Panel */}
        <div className="col-span-2 h-screen border-l relative z-10">
          <DiagramLeftSidebar
            onShapeSelect={setSelectedShape} // Pass shape selection handler
            onAICreate={onAICreate}
            className="col-span-2 h-screen border-r"
          />
        </div>

        {/* Whiteboard/Canvas */}
        <div className="col-span-8 h-screen border-l border-r">
          <Canvas selectedShape={selectedShape} /> {/* Pass selected shape */}
        </div>

        {/* Right Side Panel */}
        <DiagramRightSidebar
          onAICreate={onAICreate}
          className="col-span-2 h-screen border-r"
        />
      </div>
    </div>
  );
}

export default Workspace;
