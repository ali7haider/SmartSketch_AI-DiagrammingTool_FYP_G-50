"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import SidebarOptionBox from "./SidebarOptionBox";
// Define the type for the props
interface DiagramLeftSidebarProps {
  onAICreate: () => void;
  className?: string; // Add className explicitly
}

const DiagramLeftSidebar: React.FC<DiagramLeftSidebarProps> = ({
  onAICreate,
  className = "",
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("General");

  const categories = ["General", "Misc", "Advanced", "Basic"];

  return (
    <div
      className={`bg-gray-100 border-r border-gray-300 h-full flex flex-col p-3 ${className}`}
      style={{ overflow: "visible" }} // Allow hover popup to overflow
    >
      <div className="mb-4 relative">
        <SearchBox />
        <SidebarOptionBox />
      </div>
    </div>
  );
};

export default DiagramLeftSidebar;
