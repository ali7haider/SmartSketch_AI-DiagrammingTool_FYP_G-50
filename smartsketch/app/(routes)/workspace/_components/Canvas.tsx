"use client";
import React, { useState } from "react";
import { Stage, Layer, Rect, Line } from "react-konva"; // Import Konva components

const Canvas: React.FC = () => {
  const gridSize = 40; // Size of each grid square (box)
  const gridLines = 20; // Number of grid lines for both x and y axis

  // Generate grid lines
  const gridLinesArray: JSX.Element[] = [];

  for (let i = 0; i < gridLines; i++) {
    // Horizontal lines
    gridLinesArray.push(
      <Line
        key={`h-${i}`}
        points={[0, i * gridSize, gridLines * gridSize, i * gridSize]}
        stroke="gray"
        strokeWidth={1}
        opacity={0.2}
      />
    );
    // Vertical lines
    gridLinesArray.push(
      <Line
        key={`v-${i}`}
        points={[i * gridSize, 0, i * gridSize, gridLines * gridSize]}
        stroke="gray"
        strokeWidth={1}
        opacity={0.2}
      />
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Stage width={800} height={600}>
        <Layer>
          {/* Render Grid Lines */}
          {gridLinesArray}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
