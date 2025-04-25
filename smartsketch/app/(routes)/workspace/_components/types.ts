export interface Shape {
  id: string;
  type:
    | "Rectangle"
    | "Round Rectangle"
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
  cornerRadius?: number; // For rounded rectangles
  fill: string;
  stroke: string;
  strokeWidth: number;
}
