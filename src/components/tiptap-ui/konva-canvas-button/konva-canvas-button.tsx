import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { Button } from "@/components/tiptap-ui-primitive/button";

interface KonvaCanvasButtonProps {
  text?: string;
  width?: number;
  height?: number;
}

export const KonvaCanvasButton: React.FC<KonvaCanvasButtonProps> = ({
  text = "Canvas",
  width = 800,
  height = 400,
}) => {
  const { editor } = useCurrentEditor();

  const handleInsertCanvas = () => {
    if (!editor) return;

    editor.chain().focus().insertKonvaCanvas({ width, height }).run();
  };

  if (!editor) return null;

  return (
    <Button
      data-style="ghost"
      onClick={handleInsertCanvas}
      disabled={!editor.can().insertKonvaCanvas()}
    >
      <svg
        className="tiptap-button-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
      {text}
    </Button>
  );
};
