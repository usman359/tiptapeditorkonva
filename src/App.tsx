import { useState } from "react";
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
import { Video } from "reactjs-tiptap-editor/lib/Video.js";
import { Iframe } from "reactjs-tiptap-editor/lib/Iframe.js";
import { Link } from "reactjs-tiptap-editor/lib/Link.js";
import { Attachment } from "reactjs-tiptap-editor/lib/Attachment.js";

// Interactive Features
import { SlashCommand } from "reactjs-tiptap-editor/lib/SlashCommand.js";
import { Mention } from "reactjs-tiptap-editor/lib/Mention.js";
import { Emoji } from "reactjs-tiptap-editor/lib/Emoji.js";
import { SearchAndReplace } from "reactjs-tiptap-editor/lib/SearchAndReplace.js";

// Social Media

// Document Features
import { TableOfContents } from "reactjs-tiptap-editor/lib/TableOfContent.js";
import { TextDirection } from "reactjs-tiptap-editor/lib/TextDirection.js";
import { Drawer } from "reactjs-tiptap-editor/lib/Drawer.js";

// Import/Export
import { ExportPdf } from "reactjs-tiptap-editor/lib/ExportPdf.js";
import { ImportWord } from "reactjs-tiptap-editor/lib/ImportWord.js";
import { ExportWord } from "reactjs-tiptap-editor/lib/ExportWord.js";

// Typography
import { FontFamily } from "reactjs-tiptap-editor/lib/FontFamily.js";
import { FontSize } from "reactjs-tiptap-editor/lib/FontSize.js";
import { LineHeight } from "reactjs-tiptap-editor/lib/LineHeight.js";

// Core Features
import { Document } from "reactjs-tiptap-editor/lib/Document.js";
import { History } from "reactjs-tiptap-editor/lib/History.js";
import { Selection } from "reactjs-tiptap-editor/lib/Selection.js";
import { TrailingNode } from "reactjs-tiptap-editor/lib/TrailingNode.js";

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
  Image,
  Video,
  Iframe,
  Link,
  Attachment,

  // Interactive Features
  SlashCommand,
  Mention,
  Emoji,
  SearchAndReplace,

  // Document Features
  TableOfContents,
  TextDirection,
  Drawer,

  // Import/Export
  ExportPdf,
  ImportWord,
  ExportWord,

  // Typography
  FontFamily,
  FontSize,
  LineHeight,

  // Core Features
  Document,
  History,
  Selection,
  TrailingNode,
];

const App = () => {
  const [content, setContent] = useState("");

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <RichTextEditor
        output="html"
        content={content}
        onChangeContent={onChangeContent}
        extensions={extensions}
        dark={false}
        dense={false}
        maxWidth="100%"
        minHeight="500px"
      />
    </div>
  );
};

export default App;
