// Type definitions for Konva integration
declare module "react-konva" {
  import { Component } from "react";
  import Konva from "konva";

  export interface StageProps {
    width: number;
    height: number;
    onMouseDown?: (e: any) => void;
    onMousemove?: (e: any) => void;
    onMouseup?: (e: any) => void;
    children?: React.ReactNode;
  }

  export interface LayerProps {
    children?: React.ReactNode;
  }

  export interface LineProps {
    points: number[];
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    lineCap?: string;
    lineJoin?: string;
    draggable?: boolean;
    onClick?: () => void;
    onDragEnd?: (e: any) => void;
  }

  export interface RectProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    draggable?: boolean;
    onClick?: () => void;
    onDragEnd?: (e: any) => void;
  }

  export interface CircleProps {
    x?: number;
    y?: number;
    radius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    draggable?: boolean;
    onClick?: () => void;
    onDragEnd?: (e: any) => void;
  }

  export interface EllipseProps {
    x?: number;
    y?: number;
    radiusX?: number;
    radiusY?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    draggable?: boolean;
    onClick?: () => void;
    onDragEnd?: (e: any) => void;
  }

  export interface RegularPolygonProps {
    x?: number;
    y?: number;
    sides?: number;
    radius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    draggable?: boolean;
    onClick?: () => void;
    onDragEnd?: (e: any) => void;
  }

  export interface StarProps {
    x?: number;
    y?: number;
    numPoints?: number;
    innerRadius?: number;
    outerRadius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    draggable?: boolean;
    onClick?: () => void;
    onDragEnd?: (e: any) => void;
  }

  export interface TextProps {
    x?: number;
    y?: number;
    text?: string;
    fontSize?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    draggable?: boolean;
    onClick?: () => void;
    onDragEnd?: (e: any) => void;
    onDblClick?: () => void;
  }

  export class Stage extends Component<StageProps> {}
  export class Layer extends Component<LayerProps> {}
  export class Line extends Component<LineProps> {}
  export class Rect extends Component<RectProps> {}
  export class Circle extends Component<CircleProps> {}
  export class Ellipse extends Component<EllipseProps> {}
  export class RegularPolygon extends Component<RegularPolygonProps> {}
  export class Star extends Component<StarProps> {}
  export class Text extends Component<TextProps> {}
}
