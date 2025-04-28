import React from "react";
import { Circle } from "react-konva";

interface ConnectionHandleProps {
  x: number;
  y: number;
  type: "start" | "end";
  isVisible: boolean;
  onDragMove: (pos: { x: number; y: number }) => void;
  onDragEnd: (e: any) => void;
}

const ConnectionHandle: React.FC<ConnectionHandleProps> = ({
  x,
  y,
  type,
  isVisible,
  onDragMove,
  onDragEnd,
}) => {
  return (
    <Circle
      x={x}
      y={y}
      radius={8}
      fill={type === "start" ? "#4ade80" : "#60a5fa"}
      stroke="#1e293b"
      strokeWidth={1}
      draggable
      onDragMove={(e) => {
        onDragMove({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onDragEnd={onDragEnd}
      opacity={isVisible ? 1 : 0}
      listening={isVisible}
      hitStrokeWidth={20}
      shadowForStrokeEnabled={false}
    />
  );
};

export default ConnectionHandle;
