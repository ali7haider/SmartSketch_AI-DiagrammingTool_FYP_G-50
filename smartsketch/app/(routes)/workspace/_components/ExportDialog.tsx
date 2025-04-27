"use client";
import React, { useState } from "react";

interface ExportDialogProps {
  onExport: (fileName: string, transparent: boolean) => void;
  onClose: () => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ onExport, onClose }) => {
  const [fileName, setFileName] = useState("diagram.png");
  const [transparentBg, setTransparentBg] = useState(false);

  const handleExportClick = () => {
    onExport(fileName, transparentBg);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Export as PNG</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">File Name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={transparentBg}
            onChange={() => setTransparentBg(!transparentBg)}
            id="transparent-bg"
            className="mr-2"
          />
          <label htmlFor="transparent-bg" className="text-sm">
            Transparent Background
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleExportClick}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;
