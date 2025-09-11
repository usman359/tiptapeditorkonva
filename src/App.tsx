import { useState } from "react";
import RichTextEditor from "reactjs-tiptap-editor";
import { BaseKit } from "reactjs-tiptap-editor";
import "reactjs-tiptap-editor/style.css";

// Text Formatting
import { Bold } from "reactjs-tiptap-editor/lib/Bold";
import { Italic } from "reactjs-tiptap-editor/lib/Italic";
import { Strike } from "reactjs-tiptap-editor/lib/Strike";
import { TextUnderline } from "reactjs-tiptap-editor/lib/TextUnderline";
import { Code } from "reactjs-tiptap-editor/lib/Code";
import { Highlight } from "reactjs-tiptap-editor/lib/Highlight";
import { Color } from "reactjs-tiptap-editor/lib/Color";
import { Clear } from "reactjs-tiptap-editor/lib/Clear";

// Headings and Structure
import { Heading } from "reactjs-tiptap-editor/lib/Heading";
import { HorizontalRule } from "reactjs-tiptap-editor/lib/HorizontalRule";

// Lists
import { BulletList } from "reactjs-tiptap-editor/lib/BulletList";
import { OrderedList } from "reactjs-tiptap-editor/lib/OrderedList";

// Layout and Alignment
import { Indent } from "reactjs-tiptap-editor/lib/Indent";

// Advanced Content
import { Table } from "reactjs-tiptap-editor/lib/Table";
import { CodeBlock } from "reactjs-tiptap-editor/lib/CodeBlock";
import { Image } from "reactjs-tiptap-editor/lib/Image";
import { Video } from "reactjs-tiptap-editor/lib/Video";
import { Iframe } from "reactjs-tiptap-editor/lib/Iframe";
import { Link } from "reactjs-tiptap-editor/lib/Link";
import { Attachment } from "reactjs-tiptap-editor/lib/Attachment";

// Interactive Features
import { SlashCommand } from "reactjs-tiptap-editor/lib/SlashCommand";
import { Mention } from "reactjs-tiptap-editor/lib/Mention";
import { Emoji } from "reactjs-tiptap-editor/lib/Emoji";
import { SearchAndReplace } from "reactjs-tiptap-editor/lib/SearchAndReplace";

// Social Media

// Document Features
import { TableOfContents } from "reactjs-tiptap-editor/lib/TableOfContent";
import { TextDirection } from "reactjs-tiptap-editor/lib/TextDirection";
import { Drawer } from "reactjs-tiptap-editor/lib/Drawer";

// Import/Export
import { ExportPdf } from "reactjs-tiptap-editor/lib/ExportPdf";
import { ImportWord } from "reactjs-tiptap-editor/lib/ImportWord";
import { ExportWord } from "reactjs-tiptap-editor/lib/ExportWord";

// Typography
import { FontFamily } from "reactjs-tiptap-editor/lib/FontFamily";
import { FontSize } from "reactjs-tiptap-editor/lib/FontSize";
import { LineHeight } from "reactjs-tiptap-editor/lib/LineHeight";

// Core Features
import { Document } from "reactjs-tiptap-editor/lib/Document";
import { History } from "reactjs-tiptap-editor/lib/History";
import { Selection } from "reactjs-tiptap-editor/lib/Selection";
import { TrailingNode } from "reactjs-tiptap-editor/lib/TrailingNode";

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
  const [content, setContent] = useState(null);

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
