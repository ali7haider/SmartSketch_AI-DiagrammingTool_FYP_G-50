import { Button } from "@/components/ui/button";
import { Link, Save, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus,
  faSearchMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface WorkspaceHeaderProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDelete: () => void;
}
const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  onZoomIn,
  onZoomOut,
  onDelete,
}) => {
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
        <button
          className="text-gray-600 hover:text-teal-600"
          onClick={onZoomIn}
        >
          <span className="sr-only">Zoom In</span>
          <FontAwesomeIcon icon={faSearchPlus} className="h-5 w-5" />
        </button>
        {/* Zoom Out Button */}
        <button
          className="text-gray-600 hover:text-teal-600"
          onClick={onZoomOut}
        >
          <span className="sr-only">Zoom Out</span>
          <FontAwesomeIcon icon={faSearchMinus} className="h-5 w-5" />
        </button>

        <button
          className="text-gray-600 hover:text-teal-600"
          onClick={onDelete}
        >
          <span className="sr-only">Delete</span>
          <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
        </button>

        {/* Add more buttons/icons as needed */}
      </div>
      <hr className="border-gray-300" />
    </header>
  );
};

export default WorkspaceHeader;
