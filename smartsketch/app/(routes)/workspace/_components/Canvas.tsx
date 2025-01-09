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
  const padding = 50; // Padding around the canvas

  const [canvasWidth, setCanvasWidth] = useState(initialCanvasWidth);
  const [canvasHeight, setCanvasHeight] = useState(initialCanvasHeight);
  const [shapes, setShapes] = useState<any[]>([]);

  const generateGridLines = (width: number, height: number): JSX.Element[] => {
    const lines: JSX.Element[] = [];
    const horizontalLines = Math.ceil(height / gridSize);
    const verticalLines = Math.ceil(width / gridSize);

    for (let i = 0; i <= horizontalLines; i++) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, i * gridSize, width, i * gridSize]}
          stroke="black"
          strokeWidth={0.5}
          opacity={0.2}
        />
      );
    }
    for (let i = 0; i <= verticalLines; i++) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, height]}
          stroke="black"
          strokeWidth={0.5}
          opacity={0.2}
        />
      );
    }
    return lines;
  };

  const [gridLines, setGridLines] = useState(
    generateGridLines(canvasWidth, canvasHeight)
  );

  useEffect(() => {
    setGridLines(generateGridLines(canvasWidth, canvasHeight));
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    if (selectedShape === "Rectangle") {
      const rectWidth = 100;
      const rectHeight = 60;

      setShapes((prevShapes) => [
        ...prevShapes,
        {
          type: "Rectangle",
          x: canvasWidth / 2 - rectWidth / 2,
          y: canvasHeight / 2 - rectHeight / 2,
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
    if (shape.x + shape.width > canvasWidth) {
      newCanvasWidth = shape.x + shape.width + padding;
    }
    if (shape.x < 0) {
      newCanvasWidth = canvasWidth + Math.abs(shape.x) + padding;
    }
    if (shape.y + shape.height > canvasHeight) {
      newCanvasHeight = shape.y + shape.height + padding;
    }
    if (shape.y < 0) {
      newCanvasHeight = canvasHeight + Math.abs(shape.y) + padding;
    }

    setCanvasWidth(newCanvasWidth);
    setCanvasHeight(newCanvasHeight);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        position: "relative",
        padding: `${padding}px`,
        boxSizing: "border-box",

        backgroundColor: "#FBFBFB",
      }}
    >
      <div
        style={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          position: "relative",
          backgroundColor: "#fff",
        }}
      >
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          scaleX={zoom}
          scaleY={zoom}
          style={{ border: "1px solid #ccc" }}
        >
          <Layer>
            {gridLines}
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
    </div>
  );
};

export default Canvas;
