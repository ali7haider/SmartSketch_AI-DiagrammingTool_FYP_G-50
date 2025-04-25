import React, { useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle, Arrow } from "react-konva";
import { v4 as uuidv4 } from "uuid";

interface Shape {
  id: string;
  type:
    | "Rectangle"
    | "Circle"
    | "Square"
    | "Line"
    | "Dashed Line"
    | "Dotted Line"
    | "Directional Connector"
    | "Bidirectional Connector";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: number[];
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
        points: [0, 0, 100, 0], // ✅ relative coordinates
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
  }, [selectedShape, canvasWidth, canvasHeight, setShapes, setSelectedShape]);

  const handleShapeClick = (id: string) => {
    setSelectedShape(id);
  };

  const handleDragMove = (index: number, newX: number, newY: number) => {
    setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes];
      const shape = updatedShapes[index];
      const dx = newX - shape.x;
      const dy = newY - shape.y;

      // Update position
      updatedShapes[index] = {
        ...shape,
        x: newX,
        y: newY,
        points: shape.points
          ? shape.points.map((value, i) =>
              i % 2 === 0 ? value + dx : value + dy
            )
          : shape.points,
      };
      return updatedShapes;
    });

    const shape = shapes[index];
    let newCanvasWidth = canvasWidth;
    let newCanvasHeight = canvasHeight;

    const allX = shape.points?.filter((_, i) => i % 2 === 0) || [
      shape.x + (shape.width || shape.radius || 0),
    ];
    const allY = shape.points?.filter((_, i) => i % 2 === 1) || [
      shape.y + (shape.height || shape.radius || 0),
    ];

    const maxX = Math.max(...allX);
    const minX = Math.min(...allX);
    const maxY = Math.max(...allY);
    const minY = Math.min(...allY);

    if (maxX > canvasWidth) newCanvasWidth = maxX + padding;
    if (minX < 0) newCanvasWidth = canvasWidth + Math.abs(minX) + padding;
    if (maxY > canvasHeight) newCanvasHeight = maxY + padding;
    if (minY < 0) newCanvasHeight = canvasHeight + Math.abs(minY) + padding;

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
              const commonProps = {
                key: shape.id,
                x: shape.x,
                y: shape.y,
                stroke: shape.stroke,
                strokeWidth: selectedShape === shape.id ? 3 : shape.strokeWidth,
                draggable: true,
                onClick: () => handleShapeClick(shape.id),
                onDragMove: (e: any) => {
                  handleDragMove(index, e.target.x(), e.target.y());
                },
              };

              switch (shape.type) {
                case "Rectangle":
                case "Square":
                  return (
                    <Rect
                      {...commonProps}
                      width={shape.width}
                      height={shape.height}
                      fill={shape.fill}
                    />
                  );
                case "Circle":
                  return (
                    <Circle
                      {...commonProps}
                      radius={shape.radius}
                      fill={shape.fill}
                    />
                  );
                case "Line":
                case "Dashed Line":
                case "Dotted Line":
                  return (
                    <Line
                      {...commonProps}
                      points={shape.points || []}
                      dash={
                        shape.type === "Dashed Line"
                          ? [10, 5]
                          : shape.type === "Dotted Line"
                            ? [2, 4]
                            : undefined
                      }
                    />
                  );
                case "Directional Connector":
                  return (
                    <Arrow
                      {...commonProps}
                      points={shape.points || []}
                      pointerLength={10}
                      pointerWidth={10}
                    />
                  );
                case "Bidirectional Connector":
                  return (
                    <Arrow
                      {...commonProps}
                      points={shape.points || []}
                      pointerLength={10}
                      pointerWidth={10}
                      pointerAtBeginning
                    />
                  );
                default:
                  return null;
              }
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;
