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
    } else if (selectedShape === "Round Rectangle") {
      addShape({
        id: uuidv4(),
        type: "Round Rectangle",
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
    } else if (selectedShape === "Text") {
      addShape({
        id: uuidv4(),
        type: "Text",
        x,
        y,
        text: "Double click to edit",
        fontSize: 16,
        fill: "black",
        width: 150,
        height: 30,
      });
    } else if (selectedShape === "Heading") {
      addShape({
        id: uuidv4(),
        type: "Heading",
        x,
        y,
        text: "Heading",
        fontSize: 24,
        fill: "black",
        fontWeight: "bold",
        width: 200,
        height: 40,
      });
    } else if (selectedShape === "Ellipse") {
      addShape({
        id: uuidv4(),
        type: "Ellipse",
        x,
        y,
        radiusX: 50,
        radiusY: 30,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
      });
    } else if (selectedShape === "Diamond") {
      addShape({
        id: uuidv4(),
        type: "Diamond",
        x,
        y,
        width: 80,
        height: 60,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
      });
    } else if (selectedShape === "Parallelogram") {
      // addShape({
      //   id: uuidv4(),
      //   type: "Parallelogram",
      //   x,
      //   y,
      //   width: 100,
      //   height: 60,
      //   skewX: 20,
      //   fill: "white",
      //   stroke: "black",
      //   strokeWidth: 1,
      // });
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

    const shape = shapes[index];
    const shapeRight = newX + (shape.width || shape.radius || 0);
    const shapeLeft = newX;
    const shapeBottom = newY + (shape.height || shape.radius || 0);
    const shapeTop = newY;

    // Calculate boundaries for ALL shapes
    const allShapesRight = Math.max(
      ...shapes.map((s) => s.x + (s.width || s.radius || 0))
    );
    const allShapesLeft = Math.min(...shapes.map((s) => s.x));
    const allShapesBottom = Math.max(
      ...shapes.map((s) => s.y + (s.height || s.radius || 0))
    );
    const allShapesTop = Math.min(...shapes.map((s) => s.y));

    // Calculate required canvas expansion
    const rightExpansion = Math.max(0, allShapesRight + padding - canvasWidth);
    const leftExpansion = Math.max(0, padding - allShapesLeft);
    const bottomExpansion = Math.max(
      0,
      allShapesBottom + padding - canvasHeight
    );
    const topExpansion = Math.max(0, padding - allShapesTop);

    // Calculate new dimensions
    const newWidth = Math.max(
      initialCanvasWidth,
      canvasWidth + rightExpansion + leftExpansion
    );
    const newHeight = Math.max(
      initialCanvasHeight,
      canvasHeight + bottomExpansion + topExpansion
    );

    // Calculate canvas offset to handle negative coordinates
    const offsetX = Math.min(0, allShapesLeft - padding);
    const offsetY = Math.min(0, allShapesTop - padding);

    // Only update if there's a significant change
    if (
      Math.abs(newWidth - canvasWidth) > 10 ||
      Math.abs(newHeight - canvasHeight) > 10
    ) {
      setCanvasWidth(newWidth);
      setCanvasHeight(newHeight);
    }
  };

  const handleCanvasClick = (e: any) => {
    const stage = e.target.getStage();
    // Check if we clicked directly on the stage (empty space)
    if (e.target === stage) {
      setSelectedShape(null);
      transformerRef.current?.nodes([]);
      stage.batchDraw();
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-auto"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          transition: "width 0.2s ease-out, height 0.2s ease-out",
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          backgroundColor: "#FBFBFB",
        }}
      >
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          scaleX={zoom}
          scaleY={zoom}
          style={{ border: "1px solid #ccc" }}
          onClick={handleCanvasClick}
          offsetX={-Math.min(0, ...shapes.map((s) => s.x - padding))}
          offsetY={-Math.min(0, ...shapes.map((s) => s.y - padding))}
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
                onConnectionHandleDrag={() => {}}
                onConnectionHandleDragEnd={() => {}}
              />
            ))}

            {selectedShape && shapeRefs.current[selectedShape] && (
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
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
