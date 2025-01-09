// Canvas Component
import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle } from "react-konva";

interface CanvasProps {
  selectedShape: string | null;
  zoom: number; // Zoom level passed as prop
  setZoom: React.Dispatch<React.SetStateAction<number>>; // Set zoom function passed as prop
}

const Canvas: React.FC<CanvasProps> = ({ selectedShape, zoom, setZoom }) => {
  const initialCanvasWidth = 800;
  const initialCanvasHeight = 600;
  const gridSize = 40;
  const gridLines = 20;

  const [canvasWidth, setCanvasWidth] = useState(initialCanvasWidth);
  const [canvasHeight, setCanvasHeight] = useState(initialCanvasHeight);
  const [shapes, setShapes] = useState<any[]>([]);

  const gridLinesArray: JSX.Element[] = [];
  for (let i = 0; i < gridLines; i++) {
    gridLinesArray.push(
      <Line
        key={`h-${i}`}
        points={[0, i * gridSize, gridLines * gridSize, i * gridSize]}
        stroke="black"
        strokeWidth={1}
        opacity={0.2}
      />
    );
    gridLinesArray.push(
      <Line
        key={`v-${i}`}
        points={[i * gridSize, 0, i * gridSize, gridLines * gridSize]}
        stroke="black"
        strokeWidth={1}
        opacity={0.2}
      />
    );
  }

  useEffect(() => {
    if (selectedShape === "Rectangle") {
      const rectWidth = 100;
      const rectHeight = 60;

      setShapes((prevShapes) => [
        ...prevShapes,
        {
          type: "Rectangle",
          x: initialCanvasWidth / 2 - rectWidth / 2,
          y: initialCanvasHeight / 2 - rectHeight / 2,
          width: rectWidth,
          height: rectHeight,
          fill: "blue",
        },
      ]);
    }
  }, [selectedShape]);

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

    let newCanvasWidth = canvasWidth;
    let newCanvasHeight = canvasHeight;

    const shape = shapes[index];
    if (shape.x + shape.width > newCanvasWidth) {
      newCanvasWidth = shape.x + shape.width + 50;
    }
    if (shape.y + shape.height > newCanvasHeight) {
      newCanvasHeight = shape.y + shape.height + 50;
    }

    setCanvasWidth(newCanvasWidth);
    setCanvasHeight(newCanvasHeight);
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        scaleX={zoom}
        scaleY={zoom}
      >
        <Layer>
          {gridLinesArray}
          {shapes.map((shape, index) => {
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
