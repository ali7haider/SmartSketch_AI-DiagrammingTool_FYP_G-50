"use client";
import React from "react";

// Define the type for the props
interface DiagramRightSidebarProps {
  onAICreate: () => void;
  className?: string; // Add className explicitly
}

const DiagramRightSidebar: React.FC<DiagramRightSidebarProps> = ({
  onAICreate,
  className = "", // Default to empty string if no className is provided
}) => {
  return (
    <div
      className={`bg-gray-100 border-r border-gray-300 h-full flex items-start justify-center p-4 ${className}`}
    >
      <button
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 px-5 rounded shadow"
        onClick={onAICreate}
      >
        Create Diagram with AI
      </button>
    </div>
  );
};

export default DiagramRightSidebar;
