import React, { useCallback, useRef, useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import {
  Stage,
  Layer,
  Line,
  Rect,
  Circle,
  Ellipse,
  RegularPolygon,
  Star,
  Text,
} from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Drawing tools
export type DrawingTool =
  | "select"
  | "pen"
  | "rectangle"
  | "circle"
  | "ellipse"
  | "triangle"
  | "star"
  | "text";

// Shape interface
interface Shape {
  id: string;
  type: "line" | "rect" | "circle" | "ellipse" | "triangle" | "star" | "text";
  x?: number;
  y?: number;
  points?: number[];
  width?: number;
  height?: number;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  sides?: number;
  innerRadius?: number;
  outerRadius?: number;
  text?: string;
  fontSize?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  draggable?: boolean;
}

export const KonvaCanvasComponent: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  selected,
}) => {
  const { canvasData } = node.attrs as {
    width: number;
    height: number;
    canvasData: Shape[] | null;
  };
  const [shapes, setShapes] = useState<Shape[]>(canvasData || []);

  // Load canvas data from node attributes or localStorage
  React.useEffect(() => {
    if (canvasData && canvasData.length > 0) {
      // Use node data if available
      setShapes(canvasData);
    } else {
      // Try to load from localStorage if no node data
      const savedData = localStorage.getItem("konva-canvas-data");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData.length > 0) {
            setShapes(parsedData);
            // Update the node attributes with the loaded data
            updateAttributes({ canvasData: parsedData });
          }
        } catch (error) {
          console.error("Failed to parse saved canvas data:", error);
        }
      }
    }
  }, [canvasData, updateAttributes]);
  const [tool, setTool] = useState<DrawingTool>("select");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<number[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const canvasWidth = 1280;
  const canvasHeight = 640;
  const [isResizing, setIsResizing] = useState(false);
  const [isTextDialogOpen, setIsTextDialogOpen] = useState(false);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [textValue, setTextValue] = useState("");
  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  // Save canvas data to node attributes and localStorage
  const saveCanvasData = useCallback(
    (shapesData: Shape[]) => {
      updateAttributes({ canvasData: shapesData });
      // Also save to localStorage for persistence
      localStorage.setItem("konva-canvas-data", JSON.stringify(shapesData));
    },
    [updateAttributes]
  );

  // Update shapes and save to node
  const updateShapes = useCallback(
    (newShapes: Shape[]) => {
      setShapes(newShapes);
      saveCanvasData(newShapes);
    },
    [saveCanvasData]
  );

  // Generate unique ID for shapes
  const generateId = () =>
    `shape_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const handleResizeEnd = () => {
    if (isResizing) {
      updateAttributes({
        width: canvasWidth,
        height: canvasHeight,
        canvasData: shapes,
      });
      setIsResizing(false);
    }
  };

  // Handle mouse down on stage
  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    // If clicking on a shape, don't start drawing
    if (e.target !== stageRef.current) {
      return;
    }

    // Don't start drawing if clicking on empty stage
    if (tool === "select") return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    setIsDrawing(true);
    setSelectedShapeId(null);

    const newShape: Shape = {
      id: generateId(),
      type:
        tool === "pen"
          ? "line"
          : tool === "rectangle"
          ? "rect"
          : tool === "circle"
          ? "circle"
          : tool === "ellipse"
          ? "ellipse"
          : tool === "triangle"
          ? "triangle"
          : tool === "star"
          ? "star"
          : "text",
      x: pos.x,
      y: pos.y,
      fill: tool === "text" ? "transparent" : "rgba(0, 123, 255, 0.3)",
      stroke: "#007bff",
      strokeWidth: 2,
      draggable: true,
    };

    if (tool === "pen") {
      newShape.points = [pos.x, pos.y];
    } else if (tool === "rectangle") {
      newShape.width = 0;
      newShape.height = 0;
    } else if (tool === "circle") {
      newShape.radius = 0;
    } else if (tool === "ellipse") {
      newShape.radiusX = 0;
      newShape.radiusY = 0;
    } else if (tool === "triangle") {
      newShape.sides = 3;
      newShape.radius = 0;
    } else if (tool === "star") {
      newShape.innerRadius = 0;
      newShape.outerRadius = 0;
    } else if (tool === "text") {
      newShape.text = "Double click to edit";
      newShape.fontSize = 16;
      newShape.fill = "#000000";
    }

    if (tool === "pen") {
      setCurrentPath([pos.x, pos.y]);
    }

    updateShapes([...shapes, newShape]);
  };

  // Handle mouse move
  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (isResizing) {
      return;
    }

    if (!isDrawing) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    const newShapes = [...shapes];
    const lastShape = newShapes[newShapes.length - 1];

    if (tool === "pen" && lastShape.type === "line") {
      const newPath = [...currentPath, pos.x, pos.y];
      setCurrentPath(newPath);
      lastShape.points = newPath;
    } else if (tool === "rectangle" && lastShape.type === "rect") {
      lastShape.width = pos.x - lastShape.x!;
      lastShape.height = pos.y - lastShape.y!;
    } else if (tool === "circle" && lastShape.type === "circle") {
      const radius = Math.sqrt(
        Math.pow(pos.x - lastShape.x!, 2) + Math.pow(pos.y - lastShape.y!, 2)
      );
      lastShape.radius = radius;
    } else if (tool === "ellipse" && lastShape.type === "ellipse") {
      lastShape.radiusX = Math.abs(pos.x - lastShape.x!);
      lastShape.radiusY = Math.abs(pos.y - lastShape.y!);
    } else if (tool === "triangle" && lastShape.type === "triangle") {
      const radius = Math.sqrt(
        Math.pow(pos.x - lastShape.x!, 2) + Math.pow(pos.y - lastShape.y!, 2)
      );
      lastShape.radius = radius;
    } else if (tool === "star" && lastShape.type === "star") {
      const radius = Math.sqrt(
        Math.pow(pos.x - lastShape.x!, 2) + Math.pow(pos.y - lastShape.y!, 2)
      );
      lastShape.outerRadius = radius;
      lastShape.innerRadius = radius * 0.5;
    }

    updateShapes(newShapes);
  };

  // Handle mouse up
  const handleMouseUp = () => {
    if (isResizing) {
      handleResizeEnd();
    } else {
      setIsDrawing(false);
      setCurrentPath([]);
    }
  };

  // Handle shape click for selection
  const handleShapeClick = (shapeId: string) => {
    if (tool === "select") {
      setSelectedShapeId(selectedShapeId === shapeId ? null : shapeId);
    }
  };

  // Handle shape drag
  const handleShapeDragEnd = (shapeId: string) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        const stage = stageRef.current;
        if (stage) {
          const node = stage.findOne(`#${shapeId}`);
          if (node) {
            return {
              ...shape,
              x: node.x(),
              y: node.y(),
            };
          }
        }
      }
      return shape;
    });
    updateShapes(newShapes);
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("handleKeyDown", e, "selectedShapeId:", selectedShapeId);
      // Escape key - deselect current shape (works globally)
      if (e.key === "Escape" && selectedShapeId) {
        e.preventDefault();
        setSelectedShapeId(null);
        return;
      }

      // Undo shortcuts (Cmd+Z on Mac, Ctrl+Z on Windows) - only when canvas is selected
      if (selected && (e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        // For now, just deselect - in a full implementation, you'd integrate with TipTap's undo
        setSelectedShapeId(null);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedShapeId, selected]);

  // Clear canvas
  const clearCanvas = () => {
    updateShapes([]);
    setSelectedShapeId(null);
  };

  // Handle text editing
  const handleTextDblClick = (shapeId: string) => {
    const textShape = shapes.find((s) => s.id === shapeId);
    if (textShape && textShape.type === "text") {
      setEditingTextId(shapeId);
      setTextValue(textShape.text || "");
      setIsTextDialogOpen(true);
    }
  };

  // Handle text dialog save
  const handleTextSave = () => {
    if (editingTextId) {
      const newShapes = shapes.map((shape) =>
        shape.id === editingTextId ? { ...shape, text: textValue } : shape
      );
      updateShapes(newShapes);
    }
    setIsTextDialogOpen(false);
    setEditingTextId(null);
    setTextValue("");
  };

  // Handle text dialog cancel
  const handleTextCancel = () => {
    setIsTextDialogOpen(false);
    setEditingTextId(null);
    setTextValue("");
  };

  // Render shape based on type
  const renderShape = (shape: Shape) => {
    const isSelected = selectedShapeId === shape.id;
    const commonProps = {
      key: shape.id,
      fill: shape.fill,
      stroke: isSelected ? "#ff6b6b" : shape.stroke,
      strokeWidth: isSelected ? 3 : shape.strokeWidth,
      draggable: tool === "select" && shape.draggable,
      onClick: () => handleShapeClick(shape.id),
      onDragEnd: () => handleShapeDragEnd(shape.id),
    };

    switch (shape.type) {
      case "line":
        return (
          <>
            {/* Invisible wider line for better click detection */}
            <Line
              key={`${shape.id}-clickable`}
              points={shape.points || []}
              stroke="transparent"
              strokeWidth={15}
              lineCap="round"
              lineJoin="round"
              draggable={tool === "select" && shape.draggable}
              onClick={() => handleShapeClick(shape.id)}
              onDragEnd={() => handleShapeDragEnd(shape.id)}
            />
            {/* Visible line */}
            <Line
              {...commonProps}
              points={shape.points || []}
              lineCap="round"
              lineJoin="round"
            />
          </>
        );
      case "rect":
        return (
          <Rect
            {...commonProps}
            x={shape.x}
            y={shape.y}
            width={shape.width || 0}
            height={shape.height || 0}
          />
        );
      case "circle":
        return (
          <Circle
            {...commonProps}
            x={shape.x}
            y={shape.y}
            radius={shape.radius || 0}
          />
        );
      case "ellipse":
        return (
          <Ellipse
            {...commonProps}
            x={shape.x}
            y={shape.y}
            radiusX={shape.radiusX || 0}
            radiusY={shape.radiusY || 0}
          />
        );
      case "triangle":
        return (
          <RegularPolygon
            {...commonProps}
            x={shape.x}
            y={shape.y}
            sides={3}
            radius={shape.radius || 0}
          />
        );
      case "star":
        return (
          <Star
            {...commonProps}
            x={shape.x}
            y={shape.y}
            numPoints={5}
            innerRadius={shape.innerRadius || 0}
            outerRadius={shape.outerRadius || 0}
          />
        );
      case "text":
        return (
          <Text
            {...commonProps}
            x={shape.x}
            y={shape.y}
            text={shape.text || ""}
            fontSize={shape.fontSize || 16}
            onDblClick={() => handleTextDblClick(shape.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NodeViewWrapper className="konva-canvas-wrapper">
        <div className={`konva-canvas-container ${selected ? "selected" : ""}`}>
          {/* Toolbar */}
          <div className="konva-toolbar">
            <Button
              data-style={tool === "select" ? "default" : "ghost"}
              onClick={() => setTool("select")}
            >
              Select
            </Button>
            <Button
              data-style={tool === "pen" ? "default" : "ghost"}
              onClick={() => setTool("pen")}
            >
              Pen
            </Button>
            <Button
              data-style={tool === "rectangle" ? "default" : "ghost"}
              onClick={() => setTool("rectangle")}
            >
              Rectangle
            </Button>
            <Button
              data-style={tool === "circle" ? "default" : "ghost"}
              onClick={() => setTool("circle")}
            >
              Circle
            </Button>
            <Button
              data-style={tool === "ellipse" ? "default" : "ghost"}
              onClick={() => setTool("ellipse")}
            >
              Ellipse
            </Button>
            <Button
              data-style={tool === "triangle" ? "default" : "ghost"}
              onClick={() => setTool("triangle")}
            >
              Triangle
            </Button>
            <Button
              data-style={tool === "star" ? "default" : "ghost"}
              onClick={() => setTool("star")}
            >
              Star
            </Button>
            <Button
              data-style={tool === "text" ? "default" : "ghost"}
              onClick={() => setTool("text")}
            >
              Text
            </Button>
            <Button data-style="ghost" onClick={clearCanvas}>
              Clear
            </Button>
          </div>

          {/* Canvas */}
          <div className="konva-stage-container">
            <Stage
              ref={stageRef}
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
            >
              <Layer ref={layerRef}>{shapes.map(renderShape)}</Layer>
            </Stage>
          </div>
        </div>
      </NodeViewWrapper>

      {/* Text editing dialog */}
      <Dialog open={isTextDialogOpen} onOpenChange={setIsTextDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Text</DialogTitle>
            <DialogDescription>
              Enter the text you want to display on the canvas.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Enter text..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTextSave();
              } else if (e.key === "Escape") {
                handleTextCancel();
              }
            }}
          />
          <DialogFooter>
            <Button data-style="ghost" onClick={handleTextCancel}>
              Cancel
            </Button>
            <Button data-style="default" onClick={handleTextSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
