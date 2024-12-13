import React from "react";

const DiagramNavbar: React.FC = () => {
  return (
    <header className="bg-gray-100 border-b shadow-md">
      {/* Top Navbar */}
      <div className="relative">
        {/* Logo Positioned Overlapping Both Rows */}
        <div className="absolute top-3 left-3 bottom-0 flex items-center  ">
          <img
            src="/images/logo.png" // Adjust this path to your logo
            alt="SmartSketch Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* First Row: Diagram Name */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6    ">
          <div className="flex px-6 items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-700">
              Current Diagram
            </h1>
          </div>
        </div>

        {/* Second Row: Menu */}
        <div className="flex items-center justify-between px-4 py-1 sm:px-6 lg:px-8 ">
          <nav className="flex px-6 items-center gap-6 text-sm text-gray-700">
            <a href="#" className="hover:text-teal-600">
              File
            </a>
            <a href="#" className="hover:text-teal-600">
              Edit
            </a>
            <a href="#" className="hover:text-teal-600">
              View
            </a>
            <a href="#" className="hover:text-teal-600">
              Extras
            </a>
            <a href="#" className="hover:text-teal-600">
              Help
            </a>
            <span className="text-sm text-gray-500">(Unsaved Changes)</span>
          </nav>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Bottom Navbar: Icons Section */}
      <div className="flex overflow-x-auto items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
        {/* Example Icons */}
        <button className="text-gray-600 hover:text-teal-600">
          <span className="sr-only">Tool 1</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2"
            />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-teal-600">
          <span className="sr-only">Tool 2</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        {/* Add more buttons/icons as needed */}
      </div>
      <hr className="border-gray-300" />
    </header>
  );
};

export default DiagramNavbar;
