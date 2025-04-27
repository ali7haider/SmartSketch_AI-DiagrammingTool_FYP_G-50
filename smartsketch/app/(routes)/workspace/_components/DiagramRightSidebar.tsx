"use client";
import React, { useState } from "react";

// Define the type for the props
interface DiagramRightSidebarProps {
  onAICreate: (input: any) => void;
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
    console.log("handleApplyChanges called"); // Debug log
    try {
      const parsedData = JSON.parse(codeContent);
      onAICreate(parsedData); // Pass the parsed data to the parent function
    } catch (error) {
      alert("Invalid JSON format. Please correct it and try again.");
    }
  };

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
              onClick={() => {
                setAiInput(""); // Clear the AI input
                updateCode(aiInput); // Update the code content
              }}
            >
              Apply Changes
            </button>
          </div>
        )}
        {activeTab === "Code" && (
          <div>
            <textarea
              className="w-full h-32 p-2 border rounded"
              placeholder="Edit JSON code here..."
              value={codeContent}
              onChange={(e) => updateCode(e.target.value)} // Update the code content dynamically
            />
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded shadow mt-4"
              onClick={handleApplyChanges}
            >
              Update Canvas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagramRightSidebar;