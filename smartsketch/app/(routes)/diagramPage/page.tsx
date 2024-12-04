import DiagramNavbar from "@/app/_components/DiagramNavbar";
import React from "react";

const DiagramPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar Section */}
      <DiagramNavbar />

      {/* Main Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-64 bg-gray-200 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold">Left Sidebar</h2>
          <p>Content for left sidebar...</p>
        </aside>

        {/* Center Content */}
        <main className="flex-1 bg-white p-4 overflow-y-auto">
          <h1 className="text-2xl font-bold">Diagram Content</h1>
          <p>Work on your diagram here...</p>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-64 bg-gray-200 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold">Right Sidebar</h2>
          <p>Content for right sidebar...</p>
        </aside>
      </div>
    </div>
  );
};

export default DiagramPage;
