import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { AddNotePayload, DeleteNotePayload, EditNotePayload, Note, NotesAction } from "../types/notes.types";


interface NotesState {
    notes: Note[];
    prevId: number;
}

interface NotesContextValue {
    notes: Note[];
    onNoteEdit: (payload: EditNotePayload) => void;
    onNoteAdd: (payload: AddNotePayload) => void;
    onNoteDelete: (payload: DeleteNotePayload) => void;
}

const initialState: NotesState = {
    notes: [
        { id: 0, x: 0, y: 0, width: 200, height: 200, text: "Hello, world!", color: "#FFDD33", zIndex: 0 },
        { id: 1, x: 50, y: 50, width: 300, height: 300, text: "Hello, world!", color: "#86B8FF", zIndex: 1 },
        { id: 2, x: 200, y: 200, width: 400, height: 400, text: "Hello, world!", color: "#FFAB56", zIndex: 2 },
    ],
    prevId: 3
};

const notesReducer = (state: NotesState, action: NotesAction) => {
    switch (action.type) {
        case "EDIT_NOTE": {
            return {
                ...state,
                notes: state.notes.map(note => (note.id === action.payload.id ? { ...note, ...action.payload, zIndex: state.prevId } : note)),
                prevId: state.prevId + 1
            }
        }
        case "ADD_NOTE": {
            const newNote = { ...action.payload, id: state.prevId, zIndex: state.prevId };
            return {
                ...state,
                notes: [...state.notes, newNote],
                prevId: state.prevId + 1
            };
        }
        case "DELETE_NOTE": {
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload.id)
            }
        }
        default:
            return state;
    }
}

const NotesContext = createContext<NotesContextValue | null>(null);

export const NotesProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(notesReducer, initialState);

    const onNoteEdit = useCallback((payload: EditNotePayload) => dispatch({ type: "EDIT_NOTE", payload }), []);

    const onNoteAdd = useCallback((payload: AddNotePayload) => dispatch({ type: "ADD_NOTE", payload }), []);
    
    const onNoteDelete = useCallback((payload: DeleteNotePayload) => dispatch({ type: "DELETE_NOTE", payload }), []);

    const notesContextValue: NotesContextValue = useMemo(() => {
        return {
            notes: state.notes,
            onNoteEdit,
            onNoteAdd,
            onNoteDelete
        }
    }, [state, onNoteEdit, onNoteAdd, onNoteDelete])

    return (
        <NotesContext value={notesContextValue} >
            {children}
        </NotesContext >
    )
}

export const useNotesContext = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error("useNotesContext must be used within a NotesProvider");
    }
    return context;
}