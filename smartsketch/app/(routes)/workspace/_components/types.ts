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
    | "Bidirectional Connector"
    | "Class"
    | "relationship";   // 🆕 add this
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: number[];
  fill: string;
  stroke: string;
  strokeWidth: number;
  cornerRadius?: number;

  // 🆕 Add extra properties for class diagrams
  className?: string;
  attributes?: string[];
  methods?: string[];
  from?: string; // For relationships
  to?: string;   // For relationships
}
