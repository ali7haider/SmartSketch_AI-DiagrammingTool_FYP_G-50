import React, { useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle, Arrow } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import { Transformer } from "react-konva";
import Konva from "konva";
import { Shape } from "./types";
import ShapeRenderer from "./ShapeRenderer";

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
  const transformerRef = React.useRef<any>(null);
  const shapeRefs = React.useRef<Record<string, any>>({});

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

    const addShape = (shape: Shape) => {
      setShapes((prevShapes) => [...prevShapes, shape]);
      setSelectedShape(null);
    };

    const x = canvasWidth / 2 + getRandomOffset(50);
    const y = canvasHeight / 2 + getRandomOffset(50);

    if (selectedShape === "Rectangle") {
      addShape({
        id: uuidv4(),
        type: "Rectangle",
        x,
        y,
        width: 100,
        height: 60,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
      });
    } else if (selectedShape === "Circle") {
      addShape({
        id: uuidv4(),
        type: "Circle",
        x,
        y,
        radius: 40,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
      });
    } else if (selectedShape === "Square") {
      addShape({
        id: uuidv4(),
        type: "Square",
        x,
        y,
        width: 60,
        height: 60,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
      });
    } else if (selectedShape === "Line") {
      addShape({
        id: uuidv4(),
        type: "Line",
        points: [0, 0, 100, 0],
        x,
        y,
        fill: "",
        stroke: "black",
        strokeWidth: 2,
      });
    } else if (selectedShape === "Dashed Line") {
      addShape({
        id: uuidv4(),
        type: "Dashed Line",
        points: [0, 0, 100, 0], // ✅ relative coordinates
        x,
        y,
        fill: "",
        stroke: "black",
        strokeWidth: 2,
      });
    } else if (selectedShape === "Dotted Line") {
      addShape({
        id: uuidv4(),
        type: "Dotted Line",
        points: [0, 0, 100, 0], // ✅ relative coordinates
        x,
        y,
        fill: "",
        stroke: "black",
        strokeWidth: 2,
      });
    } else if (selectedShape === "Directional Connector") {
      addShape({
        id: uuidv4(),
        type: "Directional Connector",
        points: [0, 0, 100, 0], // ✅ relative coordinates
        x,
        y,
        fill: "",
        stroke: "black",
        strokeWidth: 2,
      });
    } else if (selectedShape === "Bidirectional Connector") {
      addShape({
        id: uuidv4(),
        type: "Bidirectional Connector",
        points: [0, 0, 100, 0], // ✅ relative coordinates
        x,
        y,
        fill: "",
        stroke: "black",
        strokeWidth: 2,
      });
    }
    const selectedNode = shapeRefs.current[selectedShape || ""];
    if (selectedNode && transformerRef.current) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer()?.batchDraw();
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
            {shapes.map((shape, index) => (
              <ShapeRenderer
                key={shape.id}
                shape={shape}
                index={index}
                isSelected={selectedShape === shape.id}
                handleShapeClick={handleShapeClick}
                handleDragMove={handleDragMove}
                shapeRefs={shapeRefs}
              />
            ))}

            {/*  Add Transformer at the end */}
            {selectedShape && shapeRefs.current[selectedShape] && (
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  // Prevent resizing smaller than 5x5
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;
