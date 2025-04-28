import React from "react";
import { Rect, Circle, Line, Arrow, Text, Ellipse } from "react-konva";
import { Shape } from "./types";
import ConnectionHandle from "./ConnectionHandle";

interface ShapeRendererProps {
  shape: Shape;
  index: number;
  isSelected: boolean;
  handleShapeClick: (id: string) => void;
  handleDragMove: (index: number, x: number, y: number) => void;
  shapeRefs: React.MutableRefObject<Record<string, any>>;
  onConnectionHandleDrag: (
    index: number,
    type: "start" | "end",
    pos: { x: number; y: number }
  ) => void;
  onConnectionHandleDragEnd: (
    index: number,
    type: "start" | "end",
    targetShapeId?: string
  ) => void;
}

const ShapeRenderer: React.FC<ShapeRendererProps> = ({
  shape,
  index,
  isSelected,
  handleShapeClick,
  handleDragMove,
  shapeRefs,
  onConnectionHandleDrag,
  onConnectionHandleDragEnd,
}) => {
  const isConnector = [
    "Line",
    "Dashed Line",
    "Dotted Line",
    "Directional Connector",
    "Bidirectional Connector",
  ].includes(shape.type);

  const renderConnector = () => {
    // Use absolute coordinates for connection points
    const startX = shape.connectionPoints?.start?.x ?? shape.x;
    const startY = shape.connectionPoints?.start?.y ?? shape.y;
    const endX = shape.connectionPoints?.end?.x ?? shape.x + 100;
    const endY = shape.connectionPoints?.end?.y ?? shape.y;

    return (
      <>
        {shape.type.includes("Connector") ? (
          <Arrow
            points={[startX, startY, endX, endY]}
            stroke={isSelected ? "#3b82f6" : shape.stroke || "black"}
            strokeWidth={isSelected ? 3 : shape.strokeWidth || 2}
            pointerLength={10}
            pointerWidth={10}
            pointerAtBeginning={shape.type === "Bidirectional Connector"}
            pointerAtEnding={true}
            dash={
              shape.type === "Dashed Line"
                ? [10, 5]
                : shape.type === "Dotted Line"
                  ? [2, 4]
                  : undefined
            }
            draggable
            onClick={(e) => {
              e.cancelBubble = true;
              handleShapeClick(shape.id);
            }}
            onDragStart={(e) => {
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              handleDragMove(index, e.target.x(), e.target.y());
            }}
            name={shape.id}
          />
        ) : (
          <Line
            points={[startX, startY, endX, endY]}
            stroke={isSelected ? "#3b82f6" : shape.stroke || "black"}
            strokeWidth={isSelected ? 3 : shape.strokeWidth || 2}
            dash={
              shape.type === "Dashed Line"
                ? [10, 5]
                : shape.type === "Dotted Line"
                  ? [2, 4]
                  : undefined
            }
            draggable
            onClick={(e) => {
              e.cancelBubble = true;
              handleShapeClick(shape.id);
            }}
            onDragStart={(e) => {
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              handleDragMove(index, e.target.x(), e.target.y());
            }}
            name={shape.id}
          />
        )}

        {isSelected && (
          <>
            <ConnectionHandle
              x={startX}
              y={startY}
              type="start"
              isVisible={true}
              onDragMove={(pos) => onConnectionHandleDrag(index, "start", pos)}
              onDragEnd={(e) => {
                const target = e.target
                  .getStage()
                  ?.getIntersection(e.target.position());
                onConnectionHandleDragEnd(index, "start", target?.name());
              }}
            />
            <ConnectionHandle
              x={endX}
              y={endY}
              type="end"
              isVisible={true}
              onDragMove={(pos) => onConnectionHandleDrag(index, "end", pos)}
              onDragEnd={(e) => {
                const target = e.target
                  .getStage()
                  ?.getIntersection(e.target.position());
                onConnectionHandleDragEnd(index, "end", target?.name());
              }}
            />
          </>
        )}
      </>
    );
  };
  const commonProps = {
    key: shape.id,
    x: shape.x,
    y: shape.y,
    stroke: isSelected ? "#3b82f6" : shape.stroke || "black",
    strokeWidth: isSelected ? 3 : shape.strokeWidth || 2,
    draggable: true,
    onClick: (e: any) => {
      e.cancelBubble = true; // Prevent event propagation
      handleShapeClick(shape.id);
    },
    onDragStart: (e: any) => {
      e.cancelBubble = true; // Prevent event propagation
    },
    onDragMove: (e: any) => {
      handleDragMove(index, e.target.x(), e.target.y());
    },
    ref: (node: any) => {
      if (node) shapeRefs.current[shape.id] = node;
    },
    name: shape.id,
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
    case "Round Rectangle":
      return (
        <Rect
          {...commonProps}
          width={shape.width}
          height={shape.height}
          fill={shape.fill}
          cornerRadius={shape.cornerRadius || 10}
        />
      );
    case "Circle":
      return (
        <Circle {...commonProps} radius={shape.radius} fill={shape.fill} />
      );
    case "Line":
    case "Dashed Line":
    case "Dotted Line":
    case "Directional Connector":
    case "Bidirectional Connector":
      return renderConnector();
    case "Text":
      return (
        <Text
          {...commonProps}
          text={shape.text || "Double click to edit"}
          fontSize={shape.fontSize || 16}
          fill={shape.fill || "black"}
          width={shape.width || 150}
          height={shape.height || 30}
          onDblClick={(e) => {
            e.cancelBubble = true;
          }}
        />
      );
    case "Heading":
      return (
        <Text
          {...commonProps}
          text={shape.text || "Heading"}
          fontSize={shape.fontSize || 24}
          fill={shape.fill || "black"}
          fontStyle="bold"
          width={shape.width || 200}
          height={shape.height || 40}
          onDblClick={(e) => {
            e.cancelBubble = true;
          }}
        />
      );
    case "Ellipse":
      return (
        <Ellipse
          {...commonProps}
          radiusX={shape.radiusX || 50}
          radiusY={shape.radiusY || 30}
          fill={shape.fill || "white"}
        />
      );
    case "Diamond":
      return (
        <Rect
          {...commonProps}
          width={shape.width || 80}
          height={shape.height || 60}
          fill={shape.fill || "white"}
          rotation={45}
          offsetX={(shape.width || 80) / 2}
          offsetY={(shape.height || 60) / 2}
        />
      );
    case "Parallelogram":
      return (
        <Rect
          {...commonProps}
          width={shape.width || 100}
          height={shape.height || 60}
          fill={shape.fill || "white"}
          skewX={shape.skewX || 20}
        />
      );
    default:
      return null;
  }
};

export default ShapeRenderer;
