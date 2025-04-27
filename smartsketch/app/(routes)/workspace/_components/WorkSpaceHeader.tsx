"use client"; // if you're using Next.js 13+, needed for components with interactivity

import { Button } from "@/components/ui/button";
import { Link, Save, Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react"; // <-- Add useState
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
  onRequestExport: (options: {
    type: "png" | "jpeg" | "webp" | "svg" | "pdf";
  }) => void;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  onZoomIn,
  onZoomOut,
  onDelete,
  onRequestExport, // <-- Add this prop
}) => {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false); // <-- State for dropdown

  const toggleFileMenu = () => setIsFileMenuOpen(!isFileMenuOpen);
  const closeFileMenu = () => setIsFileMenuOpen(false); // optional: close when clicking elsewhere (advanced later)

  return (
    <header className="bg-gray-100 border-b shadow-md">
      {/* Top Navbar */}
      <div className="relative">
        {/* Logo */}
        <div className="absolute top-3 left-3 bottom-0 flex items-center">
          <img
            src="/images/logo.png"
            alt="SmartSketch Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* First Row: Diagram Name */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex px-6 items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-700">
              Current Diagram
            </h1>
          </div>
        </div>

        {/* Second Row: Menu */}
        <div className="flex items-center justify-between px-4 py-1 sm:px-6 lg:px-8">
          <nav className="flex px-6 items-center gap-6 text-sm text-gray-700 relative">
            {/* File Menu with Click Dropdown */}
            <div className="relative">
              <button
                onClick={toggleFileMenu}
                className="hover:text-teal-600 focus:outline-none"
              >
                File
              </button>

              {isFileMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1 text-gray-700">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      New
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Open from
                    </a>
                    <hr className="my-1 border-gray-300" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Save
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Save as
                    </a>
                    <hr className="my-1 border-gray-300" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Share
                    </a>
                    <hr className="my-1 border-gray-300" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Rename
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Make a copy
                    </a>
                    <hr className="my-1 border-gray-300" />

                    {/* Export as with submenu */}
                    <div className="group relative">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          onRequestExport({ type: "png" }); // Just open the export dialog
                        }}
                      >
                        Export as...
                      </a>
                    </div>

                    <hr className="my-1 border-gray-300" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Properties
                    </a>
                    <hr className="my-1 border-gray-300" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Close
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Other menu items */}
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

      {/* Bottom Navbar: Icons */}
      <div className="flex overflow-x-auto items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <button
          className="text-gray-600 hover:text-teal-600"
          onClick={onZoomIn}
        >
          <span className="sr-only">Zoom In</span>
          <FontAwesomeIcon icon={faSearchPlus} className="h-5 w-5" />
        </button>

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
      </div>

      <hr className="border-gray-300" />
    </header>
  );
};

export default WorkspaceHeader;
