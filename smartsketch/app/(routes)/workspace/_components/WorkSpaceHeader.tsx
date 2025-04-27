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
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [diagramName, setDiagramName] = useState("Current Diagram");
  const [tempDiagramName, setTempDiagramName] = useState("Current Diagram");

  const toggleFileMenu = () => setIsFileMenuOpen(!isFileMenuOpen);
  const closeFileMenu = () => setIsFileMenuOpen(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaved(true);
  };

  const handleRenameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setTempDiagramName(diagramName);
    setShowRenameDialog(true);
    closeFileMenu();
  };

  const handleRenameConfirm = () => {
    setDiagramName(tempDiagramName);
    setShowRenameDialog(false);
    setIsSaved(false); // Mark as unsaved since we made a change
  };

  const handleRenameCancel = () => {
    setShowRenameDialog(false);
  };
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
              {diagramName}
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
                      onClick={handleSave} // Add onClick handler
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
                      onClick={handleRenameClick}
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
            <span className="text-sm text-gray-500">
              {isSaved ? "Saved changes" : "Unsaved changes"}
            </span>
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

      {showRenameDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Rename Diagram</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">New Name</label>
              <input
                type="text"
                value={tempDiagramName}
                onChange={(e) => setTempDiagramName(e.target.value)}
                className="w-full p-2 border rounded"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleRenameCancel}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRenameConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default WorkspaceHeader;
