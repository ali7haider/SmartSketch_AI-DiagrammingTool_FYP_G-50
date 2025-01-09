"use client";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle } from "react-konva"; // Import Konva components

interface CanvasProps {
  selectedShape: string | null; // Prop to receive the selected shape
}

const Canvas: React.FC<CanvasProps> = ({ selectedShape }) => {
  const gridSize = 40; // Size of each grid square (box)
  const gridLines = 20; // Number of grid lines for both x and y axis

  // State to store drawn shapes
  const [shapes, setShapes] = useState<any[]>([]);

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

  // Add shape to canvas
  useEffect(() => {
    if (selectedShape === "Rectangle") {
      const canvasWidth = 800; // Width of the canvas
      const canvasHeight = 600; // Height of the canvas
      const rectWidth = 100; // Width of the rectangle
      const rectHeight = 50; // Height of the rectangle

      // Add a rectangle to the shapes array
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          type: "Rectangle",
          x: canvasWidth / 2 - rectWidth / 2, // Centered horizontally
          y: canvasHeight / 2 - rectHeight / 2, // Centered vertically
          width: rectWidth,
          height: rectHeight,
          fill: "blue", // Default fill color
        },
      ]);
    }
  }, [selectedShape]);

  // Handle shape movement
  const handleDragMove = (index: number, newX: number, newY: number) => {
    setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes];
      updatedShapes[index] = {
        ...updatedShapes[index],
        x: newX,
        y: newY,
      };
      return updatedShapes;
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Stage width={800} height={600}>
        <Layer>
          {/* Render Grid Lines */}
          {gridLinesArray}

          {/* Render Shapes */}
          {shapes.map((shape, index) => {
            console.log(shape.type);
            if (shape.type === "Rectangle") {
              return (
                <Rect
                  key={index}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill={shape.fill}
                  draggable
                  onDragMove={(e) => {
                    handleDragMove(index, e.target.x(), e.target.y());
                  }}
                />
              );
            }
            // Add more shapes like Circle, Line etc. as needed
            if (shape.type === "Circle") {
              return (
                <Circle
                  key={index}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  fill={shape.fill}
                  draggable
                  onDragMove={(e) => {
                    handleDragMove(index, e.target.x(), e.target.y());
                  }}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
