"use client";

import React from "react";

// Define the type for the props
interface DiagramLeftSidebarProps {
  onAICreate: () => void; // Specify that onAICreate is a function that returns void
}

const DiagramLeftSidebar: React.FC<DiagramLeftSidebarProps> = ({
  onAICreate,
}) => {
  return (
    <div className="w-64 bg-gray-100 border-r border-gray-300 h-full flex flex-col items-start p-4">
      {/* Button for Creating Diagram with AI */}
      <button
        className="w-50 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 px-5 rounded shadow"
        onClick={onAICreate}
      >
        Create Diagram with AI
      </button>
    </div>
  );
};

export default DiagramLeftSidebar;
