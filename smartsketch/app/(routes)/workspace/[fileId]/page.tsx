"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import Canvas from "../_components/Canvas";
import DiagramLeftSidebar from "../_components/DiagramLeftSidebar";
import DiagramRightSidebar from "../_components/DiagramRightSidebar";
import ExportDialog from "../_components/ExportDialog"; // Import it!

const Workspace: React.FC = () => {
  const initialCanvasWidth = 800;
  const initialCanvasHeight = 600;
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1); // Initialize zoom state
  const [triggerSave, setTriggerSave] = useState(false);
  const [shapes, setShapes] = useState<any[]>([]); // Lifted shape state
  const convex = 1;
  const [codeContent, setCodeContent] = useState<string>("{}");
  const [fileData, setFileData] = useState<false>();
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Limit zoom-in
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => {
      const newZoom = prevZoom - 0.1;
      const minZoom = Math.max(
        initialCanvasWidth / 800,
        initialCanvasHeight / 600
      );
      return Math.max(newZoom, minZoom); // Limit zoom-out
    });
  };

  const onAICreate = (input: string) => {
    console.log("AI Create button clicked with input:", input);
    const generatedCode = `{"message": "Generated from AI: ${input}"}`;
    setCodeContent(generatedCode);
  };

  const handleDeleteShape = () => {
    if (selectedShape) {
      setShapes((prevShapes) =>
        prevShapes.filter((shape) => shape.id !== selectedShape)
      );
      setSelectedShape(null);
    }
  };

  // In Workspace component
  const handleExport = (
    fileName: string,
    options: {
      type: "png" | "jpeg" | "webp" | "svg" | "pdf";
      transparent: boolean;
      quality?: number;
    }
  ) => {
    const canvasElement = document.querySelector("canvas") as HTMLCanvasElement;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    // For image exports
    if (["png", "jpeg", "webp"].includes(options.type)) {
      if (!options.transparent && options.type !== "jpeg") {
        // Save current content
        const currentData = ctx.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        // Draw white background
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

        // Export
        const dataURL = canvasElement.toDataURL(
          `image/${options.type}`,
          options.quality
        );
        downloadImage(dataURL, `${fileName}.${options.type}`);

        // Restore
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.putImageData(currentData, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      } else {
        // Export with transparency (or JPEG which doesn't support transparency)
        const dataURL = canvasElement.toDataURL(
          `image/${options.type}`,
          options.quality
        );
        downloadImage(dataURL, `${fileName}.${options.type}`);
      }
    } else if (options.type === "svg") {
      // Handle SVG export
      // Note: This is a simplified approach. For a real implementation, you might need a library
      // or more complex conversion logic
      const svgContent = generateSVGFromCanvas(canvasElement);
      downloadSVG(svgContent, `${fileName}.svg`);
    } else if (options.type === "pdf") {
      // Handle PDF export
      // Note: This would typically require a library like jsPDF
      generatePDFFromCanvas(canvasElement, `${fileName}.pdf`);
    }
  };

  // Helper functions for SVG and PDF (simplified - you'd need proper implementations)
  const generateSVGFromCanvas = (canvas: HTMLCanvasElement): string => {
    // Simplified - in reality you'd need to convert canvas content to SVG
    return `<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Canvas content would be converted to SVG elements here -->
  </svg>`;
  };

  const downloadSVG = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generatePDFFromCanvas = (
    canvas: HTMLCanvasElement,
    fileName: string
  ) => {
    // This would require jsPDF or similar library
    console.log("PDF export would be implemented here");
    // Example with jsPDF:
    const imgData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
    pdf.save(fileName);
  };
  const downloadImage = (dataURL: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="p-0">
      {/* Workspace Header */}
      <WorkSpaceHeader
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDelete={handleDeleteShape}
        onRequestExport={() => setShowExportDialog(true)} // 👈 pass this new prop
      />

      {/* Workspace Layout */}
      <div className="grid grid-cols-12">
        {/* Left Side Panel */}
        <div className="col-span-2 h-screen border-l">
          <DiagramLeftSidebar
            onShapeSelect={setSelectedShape}
            className="col-span-2 h-screen border-r"
          />
        </div>
        {/* Whiteboard/Canvas */}
        <div className="col-span-7 h-screen border-l border-r">
          <Canvas
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
            zoom={zoom}
            setZoom={setZoom}
            shapes={shapes} // Pass lifted state
            setShapes={setShapes} // Pass setter
          />
        </div>
        {/* Right Side Panel */}
        <DiagramRightSidebar
          onAICreate={(input) => {
            const generatedCode = `{"message": "Generated from AI: ${input}"}`;
            setCodeContent(generatedCode);
          }}
          className="col-span-3 h-screen border-r"
          codeContent={codeContent}
          updateCode={(newCode) => setCodeContent(newCode)}
        />
        // In Workspace component's render method:
        {showExportDialog && (
          <ExportDialog
            onExport={handleExport}
            onClose={() => setShowExportDialog(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Workspace;
