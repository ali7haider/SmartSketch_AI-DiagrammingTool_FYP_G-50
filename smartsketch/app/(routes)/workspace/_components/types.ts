export interface ConnectionPoint {
  x: number;
  y: number;
  connectedTo?: string; // ID of the shape this point is connected to
}
export type Shape = {
  id: string;
  type: string;
  x: number;
  y: number;
  // Common properties for most shapes
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  connectionPoints?: {
    start: ConnectionPoint;
    end: ConnectionPoint;
  };

  // Rectangle/Square specific
  cornerRadius?: number; // For rounded rectangles

  // Circle/Ellipse specific
  radius?: number; // For Circle
  radiusX?: number; // For Ellipse
  radiusY?: number; // For Ellipse

  // Line/Connector specific
  points?: number[]; // For lines and connectors
  dash?: number[]; // For dashed/dotted lines

  // Text specific
  text?: string;
  fontSize?: number;
  fontStyle?: string; // For bold/italic etc.
  fontWeight?: string; // For bold (e.g., "bold", "normal")

  // Parallelogram specific
  skewX?: number;

  // Arrow specific
  pointerLength?: number;
  pointerWidth?: number;
  pointerAtBeginning?: boolean;
  pointerAtEnding?: boolean;
};

// Optional: You might want to create specific shape types for better type safety
export type RectangleShape = Shape & {
  type: "Rectangle" | "Square" | "Round Rectangle";
  width: number;
  height: number;
};

export type CircleShape = Shape & {
  type: "Circle";
  radius: number;
};

export type EllipseShape = Shape & {
  type: "Ellipse";
  radiusX: number;
  radiusY: number;
};

export type LineShape = Shape & {
  type: "Line" | "Dashed Line" | "Dotted Line";
  points: number[];
};

export type ConnectorShape = Shape & {
  type: "Directional Connector" | "Bidirectional Connector";
  points: number[];
};

export type TextShape = Shape & {
  type: "Text" | "Heading";
  text: string;
  fontSize: number;
  width: number;
  height: number;
};

export type DiamondShape = Shape & {
  type: "Diamond";
  width: number;
  height: number;
};

export type ParallelogramShape = Shape & {
  type: "Parallelogram";
  width: number;
  height: number;
  skewX: number;
};

// Union type for all possible shapes
export type AnyShape =
  | RectangleShape
  | CircleShape
  | EllipseShape
  | LineShape
  | ConnectorShape
  | TextShape
  | DiamondShape
  | ParallelogramShape;
