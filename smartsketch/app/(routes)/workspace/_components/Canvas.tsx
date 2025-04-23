import React, { useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle, Text, Ellipse } from "react-konva";
import { v4 as uuidv4 } from "uuid";

interface Shape {
  id: string;
  type:
    | "Rectangle"
    | "Circle"
    | "Round Rectangle"
    | "Text"
    | "Heading"
    | "Ellipse";

  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  radiusX?: number; // For Ellipse
  radiusY?: number; // For Ellipse
  text?: string; // For Text and Heading
  fill: string;
  stroke: string;
  strokeWidth: number;
}

interface CanvasProps {
  selectedShape: string | null;
  setSelectedShape: React.Dispatch<React.SetStateAction<string | null>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  shapes: Shape[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
}

const Canvas: React.FC<CanvasProps> = ({
  selectedShape,
  setSelectedShape,
  zoom,
  setZoom,
  shapes,
  setShapes,
}) => {
  const initialCanvasWidth = 800;
  const initialCanvasHeight = 600;
  const gridSize = 40;
  const padding = 50;

  const [canvasWidth, setCanvasWidth] = React.useState(initialCanvasWidth);
  const [canvasHeight, setCanvasHeight] = React.useState(initialCanvasHeight);

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
          opacity={0.5}
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
          opacity={0.5}
        />
      );
    }
    return lines;
  };

  const [gridLines, setGridLines] = React.useState(
    generateGridLines(canvasWidth, canvasHeight)
  );

  useEffect(() => {
    setGridLines(generateGridLines(canvasWidth, canvasHeight));
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    const getRandomOffset = (range: number) =>
      Math.random() * range * 2 - range;

    if (selectedShape === "Rectangle") {
      const rectWidth = 100;
      const rectHeight = 60;
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id: uuidv4(),
          type: "Rectangle",
          x: canvasWidth / 2 - rectWidth / 2 + getRandomOffset(50),
          y: canvasHeight / 2 - rectHeight / 2 + getRandomOffset(50),
          width: rectWidth,
          height: rectHeight,
          fill: "white",
          stroke: "black",
          strokeWidth: 1,
        },
      ]);
      setSelectedShape(null);
    } else if (selectedShape === "Circle") {
      const radius = 40;
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id: uuidv4(),
          type: "Circle",
          x: canvasWidth / 2 + getRandomOffset(50),
          y: canvasHeight / 2 + getRandomOffset(50),
          radius,
          fill: "white",
          stroke: "black",
          strokeWidth: 1,
        },
      ]);
      setSelectedShape(null);
    } else if (selectedShape === "Round Rectangle") {
      const rectWidth = 120;
      const rectHeight = 80;
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id: uuidv4(),
          type: "Round Rectangle",
          x: canvasWidth / 2 - rectWidth / 2 + getRandomOffset(50),
          y: canvasHeight / 2 - rectHeight / 2 + getRandomOffset(50),
          width: rectWidth,
          height: rectHeight,
          fill: "white",
          stroke: "black",
          strokeWidth: 1,
        },
      ]);
      setSelectedShape(null);
    } else if (selectedShape === "Text") {
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id: uuidv4(),
          type: "Text",
          x: canvasWidth / 2 + getRandomOffset(50),
          y: canvasHeight / 2 + getRandomOffset(50),
          text: "Sample Text",
          fill: "black",
          stroke: "none",
          strokeWidth: 1,
        },
      ]);
      setSelectedShape(null);
    } else if (selectedShape === "Heading") {
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id: uuidv4(),
          type: "Heading",
          x: canvasWidth / 2 + getRandomOffset(50),
          y: canvasHeight / 2 + getRandomOffset(50),
          text: "Heading Text",
          fill: "black",
          stroke: "none",
          strokeWidth: 1,
        },
      ]);
      setSelectedShape(null);
    } else if (selectedShape === "Ellipse") {
      const radiusX = 60;
      const radiusY = 40;
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id: uuidv4(),
          type: "Ellipse",
          x: canvasWidth / 2 + getRandomOffset(50),
          y: canvasHeight / 2 + getRandomOffset(50),
          radiusX,
          radiusY,
          fill: "white",
          stroke: "black",
          strokeWidth: 1,
        },
      ]);
      setSelectedShape(null);
    }
  }, [selectedShape, canvasWidth, canvasHeight, setShapes, setSelectedShape]);

  const handleShapeClick = (id: string) => {
    setSelectedShape(id);
  };

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
    if (shape.x + (shape.width || shape.radius || 0) > canvasWidth) {
      newCanvasWidth = shape.x + (shape.width || shape.radius || 0) + padding;
    }
    if (shape.x < 0) {
      newCanvasWidth = canvasWidth + Math.abs(shape.x) + padding;
    }
    if (shape.y + (shape.height || shape.radius || 0) > canvasHeight) {
      newCanvasHeight = shape.y + (shape.height || shape.radius || 0) + padding;
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
            {shapes.map((shape: Shape, index: number) => {
              if (shape.type === "Rectangle") {
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.fill}
                    stroke={shape.stroke}
                    strokeWidth={
                      selectedShape === shape.id ? 3 : shape.strokeWidth
                    }
                    draggable
                    onClick={() => handleShapeClick(shape.id)}
                    onDragMove={(e: any) =>
                      handleDragMove(index, e.target.x(), e.target.y())
                    }
                  />
                );
              }
              if (shape.type === "Circle") {
                return (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill={shape.fill}
                    stroke={shape.stroke}
                    strokeWidth={
                      selectedShape === shape.id ? 3 : shape.strokeWidth
                    }
                    draggable
                    onClick={() => handleShapeClick(shape.id)}
                    onDragMove={(e: any) =>
                      handleDragMove(index, e.target.x(), e.target.y())
                    }
                  />
                );
              }
              if (shape.type === "Round Rectangle") {
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.fill}
                    stroke={shape.stroke}
                    strokeWidth={
                      selectedShape === shape.id ? 3 : shape.strokeWidth
                    }
                    cornerRadius={20} // Round corners
                    draggable
                    onClick={() => handleShapeClick(shape.id)}
                    onDragMove={(e: any) =>
                      handleDragMove(index, e.target.x(), e.target.y())
                    }
                  />
                );
              }
              if (shape.type === "Text") {
                return (
                  <Text
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text || ""}
                    fontSize={20}
                    fill={shape.fill}
                    stroke={shape.stroke}
                    strokeWidth={
                      selectedShape === shape.id ? 3 : shape.strokeWidth
                    }
                    draggable
                    onClick={() => handleShapeClick(shape.id)}
                    onDragMove={(e: any) =>
                      handleDragMove(index, e.target.x(), e.target.y())
                    }
                  />
                );
              }
              if (shape.type === "Heading") {
                return (
                  <Text
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text || ""}
                    fontSize={40} // Larger text for heading
                    fontStyle="bold"
                    fill={shape.fill}
                    stroke={shape.stroke}
                    strokeWidth={
                      selectedShape === shape.id ? 3 : shape.strokeWidth
                    }
                    draggable
                    onClick={() => handleShapeClick(shape.id)}
                    onDragMove={(e: any) =>
                      handleDragMove(index, e.target.x(), e.target.y())
                    }
                  />
                );
              }
              if (shape.type === "Ellipse") {
                return (
                  <Ellipse
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radiusX={shape.radiusX ?? 0}
                    radiusY={shape.radiusY ?? 0}
                    fill={shape.fill}
                    stroke={shape.stroke}
                    strokeWidth={
                      selectedShape === shape.id ? 3 : shape.strokeWidth
                    }
                    draggable
                    onClick={() => handleShapeClick(shape.id)}
                    onDragMove={(e: any) =>
                      handleDragMove(index, e.target.x(), e.target.y())
                    }
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
