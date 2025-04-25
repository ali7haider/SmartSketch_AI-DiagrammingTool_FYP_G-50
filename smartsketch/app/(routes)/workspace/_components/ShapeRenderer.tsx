import React from "react";
import { Rect, Circle, Line, Arrow } from "react-konva";
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
    case "Round Rectangle": // Added this case for rounded rectangles
      return (
        <Rect
          {...commonProps}
          width={shape.width}
          height={shape.height}
          fill={shape.fill}
          cornerRadius={shape.cornerRadius || 10} // Add the cornerRadius property for rounded corners
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
    default:
      return null;
  }
};

export default ShapeRenderer;
