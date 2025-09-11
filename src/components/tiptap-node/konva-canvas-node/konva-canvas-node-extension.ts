import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
// @ts-ignore
import { KonvaCanvasComponent } from "./konva-canvas-component";

export interface KonvaCanvasOptions {
  HTMLAttributes: Record<string, any>;
  width: number;
  height: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    konvaCanvas: {
      /**
       * Insert a Konva canvas
       */
      insertKonvaCanvas: (options?: {
        width?: number;
        height?: number;
      }) => ReturnType;
    };
  }
}

export const KonvaCanvasNode = Node.create<KonvaCanvasOptions>({
  name: "konvaCanvas",

  addOptions() {
    return {
      HTMLAttributes: {},
      width: 800,
      height: 400,
    };
  },

  group: "block",

  atom: true,

  addAttributes() {
    return {
      width: {
        default: this.options.width,
        parseHTML: (element) => element.getAttribute("data-width"),
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {};
          }
          return {
            "data-width": attributes.width,
          };
        },
      },
      height: {
        default: this.options.height,
        parseHTML: (element) => element.getAttribute("data-height"),
        renderHTML: (attributes) => {
          if (!attributes.height) {
            return {};
          }
          return {
            "data-height": attributes.height,
          };
        },
      },
      canvasData: {
        default: null,
        parseHTML: (element) => {
          const data = element.getAttribute("data-canvas");
          return data ? JSON.parse(data) : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.canvasData) {
            return {};
          }
          return {
            "data-canvas": JSON.stringify(attributes.canvasData),
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="konva-canvas"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "konva-canvas",
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(KonvaCanvasComponent);
  },

  addCommands() {
    return {
      insertKonvaCanvas:
        (options = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              width: options.width || this.options.width,
              height: options.height || this.options.height,
            },
          });
        },
    };
  },
});
