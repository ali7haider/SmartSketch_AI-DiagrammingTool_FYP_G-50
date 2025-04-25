import React from "react";
import { Rect, Circle, Ellipse, Text } from "react-konva";

interface Shape {
  id: string;
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  text?: string;
}

interface RenderShapeProps {
  shape: Shape;
  index: number;
  selectedShape: string | null;
  handleShapeClick: (id: string) => void;
  handleDragMove: (index: number, newX: number, newY: number) => void;
}

const ShapeRenderer: React.FC<RenderShapeProps> = ({
  shape,
  index,
  selectedShape,
  handleShapeClick,
  handleDragMove,
}) => {
  const commonProps = {
    key: shape.id,
    x: shape.x,
    y: shape.y,
    fill: shape.fill,
    stroke: shape.stroke,
    strokeWidth: selectedShape === shape.id ? 3 : shape.strokeWidth,
    draggable: true,
    onClick: () => handleShapeClick(shape.id),
    onDragMove: (e: any) => handleDragMove(index, e.target.x(), e.target.y()),
  };

  switch (shape.type) {
    case "Rectangle":
      return (
        <Rect {...commonProps} width={shape.width} height={shape.height} />
      );
    case "Round Rectangle":
      return (
        <Rect
          {...commonProps}
          width={shape.width}
          height={shape.height}
          cornerRadius={20}
        />
      );
    case "Circle":
      return <Circle {...commonProps} radius={shape.radius} />;
    case "Ellipse":
      return (
        <Ellipse
          {...commonProps}
          radiusX={shape.radiusX || 50}
          radiusY={shape.radiusY || 30}
        />
      );
    case "Text":
      return <Text {...commonProps} text={shape.text || ""} fontSize={20} />;
    case "Heading":
      return (
        <Text
          {...commonProps}
          text={shape.text || ""}
          fontSize={40}
          fontStyle="bold"
        />
      );
    default:
      return null;
  }
};

export default ShapeRenderer;
