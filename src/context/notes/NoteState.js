import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = process.env.HOST || "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    const getAuthToken = () => {
        return localStorage.getItem("token")};

    // GET all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getAuthToken(),
                },
            });
            if (!response.ok) throw new Error("Failed to fetch notes");
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Error fetching notes:", error.message);
        }
    };

    // ADD a note
    const addNote = async (title, desc, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getAuthToken(),
                },
                body: JSON.stringify({ title, desc, tag }),
            });
            if (!response.ok) throw new Error("Failed to add note");
            const note = await response.json();
            setNotes(notes.concat(note));
        } catch (error) {
            console.error("Error adding note:", error.message);
        }
    };

    // DELETE a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getAuthToken(),
                },
            });
            if (!response.ok) throw new Error("Failed to delete note");
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error.message);
        }
    };

    // EDIT a note
    const editNote = async (id, title, desc, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getAuthToken(),
                },
                body: JSON.stringify({ title, desc, tag }),
            });
            if (!response.ok) throw new Error("Failed to edit note");

            // Update the note locally
            const newNotes = notes.map((note) =>
                note._id === id ? { ...note, title, desc, tag } : note
            );
            setNotes(newNotes);
        } catch (error) {
            console.error("Error editing note:", error.message);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
