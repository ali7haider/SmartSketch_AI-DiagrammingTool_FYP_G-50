"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
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
    >
      <div className="mb-4 relative">
        <SearchBox />
      </div>
      {/* Category Selector */}
      <div className="mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`block w-full text-left px-3 py-2 rounded ${
              selectedCategory === category
                ? "bg-teal-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } mb-2`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Content based on selected category */}
      <div className="flex-grow overflow-y-auto">
        {selectedCategory === "General" && <p>General shapes appear here</p>}
        {selectedCategory === "Misc" && <p>Miscellaneous shapes here</p>}
        {selectedCategory === "Advanced" && <p>Advanced shapes listed here</p>}
        {selectedCategory === "Basic" && <p>Basic shapes go here</p>}
      </div>
    </div>
  );
};

export default DiagramLeftSidebar;
