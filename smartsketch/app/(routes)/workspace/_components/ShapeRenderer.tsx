import React from "react";
import { Rect, Circle, Line, Arrow, Text, Ellipse } from "react-konva";
import { Shape } from "./types";

interface ShapeRendererProps {
  shape: Shape;
  index: number;
  isSelected: boolean;
  handleShapeClick: (id: string) => void;
  handleDragMove: (index: number, x: number, y: number) => void;
  shapeRefs: React.MutableRefObject<Record<string, any>>;
}

const ShapeRenderer: React.FC<ShapeRendererProps> = ({
  shape,
  index,
  isSelected,
  handleShapeClick,
  handleDragMove,
  shapeRefs,
}) => {
  const commonProps = {
    key: shape.id,
    x: shape.x,
    y: shape.y,
    stroke: shape.stroke,
    strokeWidth: isSelected ? 3 : shape.strokeWidth,
    draggable: true,
    onClick: () => handleShapeClick(shape.id),
    onDragMove: (e: any) => {
      handleDragMove(index, e.target.x(), e.target.y());
    },
    ref: (node: any) => {
      if (node) shapeRefs.current[shape.id] = node;
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
          hitStrokeWidth={20}
        />
      );
    case "Directional Connector":
      return (
        <Arrow
          {...commonProps}
          points={shape.points || []}
          pointerLength={10}
          pointerWidth={10}
          hitStrokeWidth={20}
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
          hitStrokeWidth={20}
        />
      );
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
            // Implement text editing logic here
            e.cancelBubble = true; // Prevent event bubbling
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
            // Implement text editing logic here
            e.cancelBubble = true; // Prevent event bubbling
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
