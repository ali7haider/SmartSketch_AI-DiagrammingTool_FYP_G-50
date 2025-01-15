"use client";
import React, { useState } from "react";

// Define the type for the props
interface DiagramRightSidebarProps {
  onAICreate: (input: string) => void;
  className?: string; // Add className explicitly
  codeContent: string; // Current JSON code of the diagram
  updateCode: (newCode: string) => void; // Function to update the code
}

const DiagramRightSidebar: React.FC<DiagramRightSidebarProps> = ({
  onAICreate,
  className = "",
  codeContent,
  updateCode,
}) => {
  const [activeTab, setActiveTab] = useState("AI"); // Track active tab
  const [aiInput, setAiInput] = useState(""); // AI input text

  const handleApplyChanges = () => {
    onAICreate(aiInput);
  };

  const dummyJson = JSON.stringify(
    {
      nodes: [
        { id: "1", label: "Start", type: "circle", position: { x: 50, y: 50 } },
        {
          id: "2",
          label: "Process",
          type: "rect",
          position: { x: 200, y: 50 },
        },
        { id: "3", label: "End", type: "circle", position: { x: 350, y: 50 } },
      ],
      edges: [
        { from: "1", to: "2", label: "Next" },
        { from: "2", to: "3", label: "Finish" },
      ],
    },
    null,
    2
  );

  return (
    <div
      className={`bg-gray-100 border-r border-gray-300 h-full flex flex-col ${className}`}
    >
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "AI" ? "bg-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("AI")}
        >
          AI
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "Code" ? "bg-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("Code")}
        >
          Code
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "AI" && (
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full h-32 p-2 border rounded"
              placeholder="Describe changes to the diagram..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
            />
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded shadow"
              onClick={handleApplyChanges}
            >
              Apply Changes
            </button>
          </div>
        )}
        {activeTab === "Code" && (
          <div>
            <pre className="bg-gray-200 p-2 rounded overflow-x-auto text-xs">
              {dummyJson || codeContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagramRightSidebar;
