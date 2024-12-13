"use client";
import DiagramNavbar from "@/app/_components/DiagramNavbar";
import DiagramLeftSidebar from "@/app/_components/DiagramLeftSidebar"; // Import the left sidebar component
import React from "react";

const DiagramPage: React.FC = () => {
  const handleAICreate = () => {
    alert("AI Diagram Creation Coming Soon!"); // Replace with actual logic for AI diagram creation
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar Section */}
      <DiagramNavbar />

      {/* Main Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-100 p-0 overflow-y-hidden">
          {/* Change overflow-y-auto to overflow-y-hidden */}
          <DiagramLeftSidebar onAICreate={handleAICreate} />
        </aside>

        {/* Center Content */}
        <main className="flex-1 bg-white p-4 overflow-y-auto">
          <h1 className="text-2xl font-bold text-center">Canvas Area</h1>
          <p className="text-center text-gray-500">
            Your diagram workspace will appear here.
          </p>
        </main>

        {/* Right Sidebar (Placeholder for future content) */}
        <aside className="hidden lg:block w-64 bg-gray-100 p-4 overflow-y-hidden">
          <h2 className="text-lg font-semibold text-gray-700">Right Sidebar</h2>
          <p className="text-gray-500">Additional tools and options here...</p>
        </aside>
      </div>
    </div>
  );
};

export default DiagramPage;
