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
  addClassesFromJson?: (callback: (classesJson: any[]) => void) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  selectedShape,
  setSelectedShape,
  zoom,
  setZoom,
  shapes,
  setShapes,
  addClassesFromJson,
}) => {
  const initialCanvasWidth = 800;
  const initialCanvasHeight = 600;
  const gridSize = 40;
  const padding = 50;
  const transformerRef = React.useRef<any>(null);
  const shapeRefs = React.useRef<Record<string, any>>({});

  const [canvasWidth, setCanvasWidth] = React.useState(initialCanvasWidth);
  const [canvasHeight, setCanvasHeight] = React.useState(initialCanvasHeight);

  // Function to add classes from JSON
  const addClassesFromJsonInternal = (classesJson: any[]) => {
    const newShapes: Shape[] = classesJson.map((cls) => ({
      id: uuidv4(),
      type: "Class",
      x: cls.x,
      y: cls.y,
      width: cls.width,
      height: cls.height,
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
      className: cls.className,
      attributes: cls.attributes,
      methods: cls.methods,
    }));

    setShapes((prev) => [...prev, ...newShapes]);
  };

  // Pass the function to the parent via props
  useEffect(() => {
    if (addClassesFromJson) {
      addClassesFromJson(addClassesFromJsonInternal);
    }
  }, [addClassesFromJson]);

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

  const handleCanvasClick = (e: any) => {
    const clickedShape = e.target;
    console.log("Clicked Target:", clickedShape);
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
      onClick={handleCanvasClick}
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