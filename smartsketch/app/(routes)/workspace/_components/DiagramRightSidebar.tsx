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
  const handleGenerateDiagram = async () => {
    if (!aiInput.trim()) {
      alert("Please enter a description for the diagram.");
      return;
    }
    
    try {
      console.log("prompt: ",aiInput); // Debug log
      const response = await fetch("http://127.0.0.1:5000/generate-diagram/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: aiInput }), // Ensure `aiInput` contains the prompt
    });
          
      const data = await response.json();
      console.log("handleGenerateDiagram called",data); // Debug log
  
      if (data.diagram_json) {
        updateCode(JSON.stringify(data.diagram_json, null, 2)); // Update the JSON code in the Code tab
        onAICreate(data.diagram_json); // Render the diagram on the canvas
      } else {
        alert("Failed to generate the diagram. Please try again.");
      }
    } catch (error) {
      console.error("Error generating diagram:", error);
      alert("An error occurred while generating the diagram.");
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
              onClick={handleGenerateDiagram}
            >
              Generate Diagram
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