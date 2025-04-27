// Add this import at the top of your file
import React, { useState } from "react";

interface ExportDialogProps {
  onExport: (
    fileName: string,
    options: {
      type: "png" | "jpeg" | "webp" | "svg" | "pdf";
      transparent: boolean;
      quality?: number;
    }
  ) => void;
  onClose: () => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ onExport, onClose }) => {
  const [fileName, setFileName] = useState("diagram");
  const [exportType, setExportType] = useState<
    "png" | "jpeg" | "webp" | "svg" | "pdf"
  >("png");
  const [transparent, setTransparent] = useState(false);
  const [quality, setQuality] = useState(90); // For JPEG/WebP

  const handleExport = () => {
    onExport(fileName, {
      type: exportType,
      transparent: exportType === "png" ? transparent : false, // Only PNG supports transparency
      quality: ["jpeg", "webp"].includes(exportType)
        ? quality / 100
        : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Export Diagram</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">File Name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Format</label>
          <select
            value={exportType}
            onChange={(e) => setExportType(e.target.value as any)}
            className="w-full p-2 border rounded"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
            <option value="svg">SVG</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        {exportType === "png" && (
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="transparent"
              checked={transparent}
              onChange={(e) => setTransparent(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="transparent">Transparent Background</label>
          </div>
        )}

        {(exportType === "jpeg" || exportType === "webp") && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;
