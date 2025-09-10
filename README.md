# TipTap Simple Editor

A clean, professional rich text editor built with the official [TipTap Simple Editor template](https://tiptap.dev/docs/ui-components/templates/simple-editor). This project provides a modern, feature-rich text editing experience with the official TipTap styling and components.

## Features

### ✨ Rich Text Formatting

- **Bold**, _italic_, and <u>underline</u> text formatting
- Multiple heading levels (H1, H2, H3, H4, H5, H6)
- Text alignment (left, center, right, justified)
- Bullet, ordered, and task lists
- Blockquotes and code blocks
- Text highlighting with colors

### 🎨 Professional UI

- Official TipTap Simple Editor template styling
- Responsive design that works on all devices
- Dark and light mode support
- Intuitive toolbar with dropdown menus
- Professional typography and spacing

### 🔗 Media Support

- Image upload and insertion
- Link creation and editing with popover UI
- Proper image sizing and styling
- Drag and drop support

### 📊 Advanced Features

- Undo/redo functionality
- Text highlighting with color picker
- Heading dropdown with all levels
- List dropdown with multiple options
- Mobile-optimized interface

## Technology Stack

- **React 19** - Modern React with latest features
- **TipTap** - Extensible rich text editor framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 01-tiptap-editor-konva
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Basic Text Editing

1. **Start typing** in the editor area
2. **Select text** to apply formatting
3. **Use the toolbar** to format your content

### Toolbar Features

- **Text Formatting**: Bold, italic, underline buttons
- **Headings**: H1, H2, H3 buttons for different heading levels
- **Alignment**: Left, center, right alignment options
- **Lists**: Bullet and numbered list creation
- **Media**: Add images and links

### Keyboard Shortcuts

- `Ctrl+B` / `Cmd+B` - Bold
- `Ctrl+I` / `Cmd+I` - Italic
- `Ctrl+U` / `Cmd+U` - Underline
- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` - Redo

## Project Structure

```
src/
├── components/
│   ├── tiptap-templates/
│   │   └── simple/
│   │       ├── simple-editor.tsx    # Official TipTap Simple Editor
│   │       ├── simple-editor.scss   # Official styling
│   │       └── theme-toggle.tsx     # Dark/light mode toggle
│   ├── tiptap-ui/                   # TipTap UI components
│   ├── tiptap-ui-primitive/         # TipTap primitive components
│   ├── tiptap-icons/                # TipTap icon components
│   ├── tiptap-node/                 # TipTap node components
│   └── ui/                          # shadcn/ui components
├── hooks/                           # TipTap custom hooks
├── styles/                          # SCSS variables and animations
├── lib/
│   └── utils.ts                     # Utility functions
├── App.tsx                          # Application entry point
├── main.tsx                         # React app initialization
└── index.css                        # Global styles with TipTap imports
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Adding New Extensions

TipTap is highly extensible. You can add new features by installing additional extensions:

```bash
npm install @tiptap/extension-<extension-name>
```

Then add it to the editor configuration in `SimpleEditor.tsx`:

```typescript
import NewExtension from "@tiptap/extension-<extension-name>";

// Add to extensions array
extensions: [
  StarterKit,
  NewExtension,
  // ... other extensions
];
```

### Styling

The editor uses Tailwind CSS for styling. You can customize the appearance by:

- Modifying the Tailwind classes in `SimpleEditor.tsx`
- Adding custom CSS in `index.css`
- Using the shadcn/ui theme system

### Toolbar Customization

Add or remove toolbar buttons by modifying the toolbar section in `SimpleEditor.tsx`. Each button is a simple React component with click handlers.

## Browser Support

- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [TipTap](https://tiptap.dev/) for the excellent rich text editor framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the beautiful icon library

## Future Enhancements

This editor provides a solid foundation for future enhancements:

- **Collaborative editing** with real-time synchronization
- **Advanced formatting** options (colors, fonts, etc.)
- **File upload** and management
- **Export options** (PDF, Word, etc.)
- **Plugin system** for custom extensions
- **Mobile-optimized** touch interactions

The clean, modular architecture makes it easy to add these features as needed.
