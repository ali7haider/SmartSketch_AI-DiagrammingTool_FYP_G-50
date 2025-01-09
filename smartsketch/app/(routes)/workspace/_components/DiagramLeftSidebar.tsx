"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import SidebarOptionBox from "./SidebarOptionBox";

interface DiagramLeftSidebarProps {
  onShapeSelect: (shape: string) => void; // Notify parent about selected shape
  className?: string;
}

const DiagramLeftSidebar: React.FC<DiagramLeftSidebarProps> = ({
  onShapeSelect,
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-100 border-r border-gray-300 h-full flex flex-col p-3 ${className}`}
      style={{ overflow: "visible" }}
    >
      <div className="mb-4 relative">
        <SearchBox />
        <SidebarOptionBox
          onShapeSelect={onShapeSelect} // Pass shape selection handler
        />
      </div>
    </div>
  );
};

export default DiagramLeftSidebar;
