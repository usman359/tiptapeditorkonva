import { useState, useEffect } from "react";
import RichTextEditor from "reactjs-tiptap-editor";
import { BaseKit } from "reactjs-tiptap-editor";
import "reactjs-tiptap-editor/style.css";

// Text Formatting
import { Bold } from "reactjs-tiptap-editor/lib/Bold.js";
import { Italic } from "reactjs-tiptap-editor/lib/Italic.js";
import { Strike } from "reactjs-tiptap-editor/lib/Strike.js";
import { TextUnderline } from "reactjs-tiptap-editor/lib/TextUnderline.js";
import { Code } from "reactjs-tiptap-editor/lib/Code.js";
import { Highlight } from "reactjs-tiptap-editor/lib/Highlight.js";
import { Color } from "reactjs-tiptap-editor/lib/Color.js";
import { Clear } from "reactjs-tiptap-editor/lib/Clear.js";

// Headings and Structure
import { Heading } from "reactjs-tiptap-editor/lib/Heading.js";
import { HorizontalRule } from "reactjs-tiptap-editor/lib/HorizontalRule.js";

// Lists
import { BulletList } from "reactjs-tiptap-editor/lib/BulletList.js";
import { OrderedList } from "reactjs-tiptap-editor/lib/OrderedList.js";

// Layout and Alignment
import { Indent } from "reactjs-tiptap-editor/lib/Indent.js";

// Advanced Content
import { Table } from "reactjs-tiptap-editor/lib/Table.js";
import { CodeBlock } from "reactjs-tiptap-editor/lib/CodeBlock.js";
import { Image } from "reactjs-tiptap-editor/lib/Image.js";
import "react-image-crop/dist/ReactCrop.css";
import { Video } from "reactjs-tiptap-editor/lib/Video.js";
import { Iframe } from "reactjs-tiptap-editor/lib/Iframe.js";
import { Link } from "reactjs-tiptap-editor/lib/Link.js";

// Interactive Features
import { SlashCommand } from "reactjs-tiptap-editor/lib/SlashCommand.js";
import { Mention } from "reactjs-tiptap-editor/lib/Mention.js";
import { Emoji } from "reactjs-tiptap-editor/lib/Emoji.js";
import { SearchAndReplace } from "reactjs-tiptap-editor/lib/SearchAndReplace.js";

// Social Media

// Document Features
import { TextDirection } from "reactjs-tiptap-editor/lib/TextDirection.js";
import { Drawer } from "reactjs-tiptap-editor/lib/Drawer.js";
import { BubbleMenuDrawer } from "reactjs-tiptap-editor/bubble-extra";
import "easydrawer/styles.css";

// Import/Export
import { ExportPdf } from "reactjs-tiptap-editor/lib/ExportPdf.js";
import { ImportWord } from "reactjs-tiptap-editor/lib/ImportWord.js";
import { ExportWord } from "reactjs-tiptap-editor/lib/ExportWord.js";

// Typography
import { FontFamily } from "reactjs-tiptap-editor/lib/FontFamily.js";
import { FontSize } from "reactjs-tiptap-editor/lib/FontSize.js";
import { LineHeight } from "reactjs-tiptap-editor/lib/LineHeight.js";

// Core Features
import { History } from "reactjs-tiptap-editor/lib/History.js";

// Utilities
import {
  saveContent,
  loadContent,
  hasStoredContent,
  clearContent,
} from "./lib/storage";
import {
  uploadImageToCloudinary,
  uploadVideoToCloudinary,
  uploadFileToCloudinary,
} from "./lib/cloudinary";
import { Toaster } from "react-hot-toast";
import { TOAST_OPTIONS } from "./lib/toast-config";
import "./styles/editor.css";

// Treat HTML with only empty paragraphs/whitespace as empty
const isEffectivelyEmpty = (html: string): boolean => {
  if (html == null) return true;
  const textOnly = html
    .replace(/<br\s*\/?>(?![^<]*>)/gi, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/<[^>]*>/g, "")
    .trim();
  return textOnly.length === 0;
};

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),

  // Text Formatting
  Bold,
  Italic,
  Strike,
  TextUnderline,
  Code,
  Highlight,
  Color,
  Clear,

  // Headings and Structure
  Heading,
  HorizontalRule,

  // Lists
  BulletList,
  OrderedList,

  // Layout and Alignment
  Indent,

  // Advanced Content
  Table,
  CodeBlock,
  Image.configure({
    upload: uploadImageToCloudinary,
  }),
  Video.configure({
    upload: uploadVideoToCloudinary,
  }),
  Iframe,
  Link,
  // Interactive Features
  SlashCommand,
  Mention,
  Emoji,
  SearchAndReplace,

  // Document Features
  TextDirection,
  Drawer.configure({
    upload: uploadFileToCloudinary,
  }),

  // Import/Export
  ExportPdf,
  ImportWord,
  ExportWord,

  // Typography
  FontFamily,
  FontSize,
  LineHeight,

  // Core Features (avoid duplicates already provided by BaseKit)
  History,
];

const App = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editorKey, setEditorKey] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load content from localStorage on component mount
  useEffect(() => {
    const savedContent = loadContent();
    if (savedContent) {
      setContent(savedContent);
    }
    setHasLoaded(true);
    // Give a small delay to ensure editor is ready
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  // Save content to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (hasLoaded && !isLoading) {
      saveContent(content, false); // Don't show toast on every keystroke
    }
  }, [content, hasLoaded, isLoading]);

  const onChangeContent = (value: string) => {
    // Ignore editor's initial empty payload while we're still loading
    if (isLoading && content && isEffectivelyEmpty(value)) {
      return;
    }
    setContent(value);
  };

  const handleClearContent = () => {
    setContent("");
    clearContent();
    // Force editor to re-render by updating the key
    setEditorKey((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
          Rich Text Editor
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleClearContent}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear All
          </button>
          <div
            style={{
              fontSize: "12px",
              color: "#666",
              display: "flex",
              alignItems: "center",
            }}
          >
            {hasStoredContent() ? "💾 Auto-saved" : "📝 New document"}
          </div>
        </div>
      </div>

      {!isLoading && (
        <RichTextEditor
          key={editorKey}
          output="html"
          content={content}
          onChangeContent={onChangeContent}
          extensions={extensions}
          dark={false}
          dense={false}
          maxWidth="100%"
          minHeight="600px"
          bubbleMenu={{
            render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
              return (
                <>
                  {bubbleDefaultDom}

                  {extensionsNames.includes("drawer") ? (
                    <BubbleMenuDrawer
                      disabled={disabled}
                      editor={editor}
                      key="drawer"
                    />
                  ) : null}
                </>
              );
            },
          }}
        />
      )}

      <Toaster position={TOAST_OPTIONS.position} toastOptions={TOAST_OPTIONS} />
    </div>
  );
};

export default App;
