# Sticky Notes

A single-page web application for managing sticky notes built with React and TypeScript.

## Architecture

The application follows a component-based architecture with centralized state management using React Context and useReducer. The main entry point (`App.tsx`) handles viewport validation through a custom hook (`useViewportSize`) and conditionally renders either the main board or an unsupported viewport message. State management is handled by `NotesContext`, which provides a reducer-based store for all note operations (create, edit, delete) and exposes these actions through a custom hook (`useNotesContext`).

The UI is composed of reusable components: `Board` serves as the main canvas and orchestrates note rendering and trash zone collision detection; `Note` handles individual note interactions including drag-to-move, resize via corner handle, and double-click text editing; `DropZone` is a generic positioned container used for the trash area. All drag interactions use the Pointer Events API for cross-browser compatibility, and z-index management ensures the most recently interacted note appears on top.

The project uses Vite as the build tool with TypeScript for static typing. No external UI component libraries are used—all components are built from scratch using plain React and inline styles. The codebase is organized into logical folders: `components/` for UI elements, `context/` for state management, `hooks/` for custom React hooks, and `types/` for TypeScript definitions.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Initial State

The application starts with **3 mock notes** pre-loaded for demonstration purposes. These notes showcase different colors and sizes, and can be moved, resized, edited, or deleted.

## How to Use

- **Move a note**: Click and drag anywhere on the note to reposition it on the board.
- **Resize a note**: Drag the small handle in the bottom-right corner of the note to change its size.
- **Edit text**: Double-click on a note to enter edit mode, then type your text. Click outside the note to save changes.
- **Delete a note**: Drag the note over the trash icon in the bottom-right corner of the screen and release it.

## Implemented Features

### Required Features (3 of 4 implemented)

| Feature | Status |
|---------|--------|
| Create a new note at specified size/position | ❌ Not implemented |
| Change note size by dragging | ✅ Implemented |
| Move a note by dragging | ✅ Implemented |
| Remove a note by dragging to trash zone | ✅ Implemented |

### Optional Features

| Feature | Status |
|---------|--------|
| Entering/editing note text | ✅ Implemented (double-click to edit) |
| Moving notes to front (z-index) | ✅ Implemented (auto on interaction) |
| Saving notes to localStorage | ❌ Not implemented |
| Different note colors | ⚠️ Partial (colors exist but no UI to change) |
| Saving notes to REST API | ❌ Not implemented |

### Additional Features

- **Viewport validation**: Shows a friendly message when screen size is below the minimum supported resolution (1024×768)

## Technical Decisions

- **Pointer Events API**: Used instead of mouse events for better cross-device compatibility
- **Inline styles**: Chosen for component encapsulation and to avoid external CSS dependencies
- **useReducer**: Selected over useState for more predictable state updates with multiple action types
- **No external libraries**: All functionality built from scratch as per requirements

## Development Time

Total development time: **~4 hours**

## Browser Support

- Google Chrome (Windows and Mac) - latest version
- Mozilla Firefox (all platforms) - latest version
- Microsoft Edge - latest version

Minimum screen resolution: **1024×768**
