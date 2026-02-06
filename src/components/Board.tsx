import { useRef, useState, type CSSProperties } from "react";
import { useNotesContext } from "../context/NotesContext";
import type { NoteRect } from "../types/notes.types";
import { DropZone } from "./DropZone";
import { Note } from "./Note";
import trashIcon from "../assets/trash.svg";

const boardStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "#F0F0F0",
    userSelect: "none",
};

const trashIconStyle: CSSProperties = {
    width: 60,
};

export const Board = () => {
    const { notes, onNoteEdit, onNoteDelete } = useNotesContext();

    const trashBucketRef = useRef<HTMLDivElement | null>(null);
    const [noteOverTrash, setNoteOverTrash] = useState<number | null>(null);

    const checkCollision = (noteRect: NoteRect): boolean => {
        if (!trashBucketRef.current) return false;
        
        const trashRect = trashBucketRef.current.getBoundingClientRect();
        
        return (
            noteRect.left < trashRect.right &&
            noteRect.right > trashRect.left &&
            noteRect.top < trashRect.bottom &&
            noteRect.bottom > trashRect.top
        );
    };

    const handleNoteDrag = (id: number, x: number, y: number, width: number, height: number) => {
        onNoteEdit({ id, x, y });
        
        const noteRect: NoteRect = {
            left: x,
            right: x + width,
            top: y,
            bottom: y + height,
        };
        
        const isOver = checkCollision(noteRect);
        setNoteOverTrash(isOver ? id : null);
    };

    const handleNoteDrop = (id: number, noteRect: NoteRect) => {
        setNoteOverTrash(null);
        
        if (checkCollision(noteRect)) {
            onNoteDelete({ id });
        }
    };

    return (
        <div style={boardStyle}>
            {notes.map(note => (
                <Note
                    key={note.id}
                    note={note}
                    isOverTrash={noteOverTrash === note.id}
                    onDrag={(id, x, y) => handleNoteDrag(id, x, y, note.width, note.height)}
                    onDrop={handleNoteDrop}
                    onResize={(id, width, height) => onNoteEdit({ id, width, height })}
                    onTextEdit={(id, text) => onNoteEdit({ id, text })}
                />)
            )}

            <DropZone ref={trashBucketRef} position="bottom-right">
                <img style={trashIconStyle} src={trashIcon} alt="Trash" />
            </DropZone>
        </div>
    )
}