import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "613b8f0f7eb5f4d1d4c8e7d6d",
            "user": "613b8f0f7b5f4d1d4c8e7d6d",
            "title": "My title",
            "description": "My description",
            "tag": "personal",
            "date": "2021-09-10T14:01:43.000Z",
            "__v": 0
        },
        {
            "_id": "613b8f0ff7b5f4d1d54c8e7d6d",
            "user": "613b8f0f7b5f4d1d4c8e7d6d",
            "title": "My title",
            "description": "My description lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc id, ultricies nunc. Nullam",
            "tag": "personal",
            "date": "2021-09-10T14:01:43.000Z",
            "__v": 0
        },
        {
            "_id": "613b8f0f7fb5fd4d1d4c8e7d6d",
            "user": "613b8f0f7b5f4d1d4c8e7d6d",
            "title": "My title",
            "description": "My description",
            "tag": "personal",
            "date": "2021-09-10T14:01:43.000Z",
            "__v": 0
        },
        {
            "_id": "613b8f0ff7b5f4d1d4c8e7d6d",
            "user": "613b8f0f7b5f4d1d4c8e7d6d",
            "title": "My title",
            "description": "My description",
            "tag": "personal",
            "date": "2021-09-10T14:01:43.000Z",
            "__v": 0
        },
        {
            "_id": "613b8f0f7fbw5f4d1d4c8e7d6d",
            "user": "613b8f0f7b5f4d1d4c8e7d6d",
            "title": "My title",
            "description": "My description",
            "tag": "personal",
            "date": "2021-09-10T14:01:43.000Z",
            "__v": 0
        },
        {
            "_id": "613b8f0f7fb5f4d1d4c8e7d6d",
            "user": "613b8f0f7b5f4d1d4c8e7d6d",
            "title": "My title",
            "description": "My description",
            "tag": "personal",
            "date": "2021-09-10T14:01:43.000Z",
            "__v": 0
        }
        
    ]
    const [notes, setNotes] = useState(notesInitial)
    // ADD a note
    const addNote = (title, description, tag) => {
        const note={
            "_id": "613b8f0rf7eb5f4d1d4c8e7d6d",
            "user": "613b8f0f7b5f4d1d4c8e7d6d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-10T14:01:43.000Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    // DELETE a note
    const deleteNote = (id) => {
        console.log(`Deleting a note with id: ${id}`)
        setNotes(notes.filter((note)=>{return note._id!==id}))
    }

    // EDIT a note
    const editNote = (id, title, description, tag) => {
    console.log("Editing a note")
    // let newNotes = JSON.parse(JSON.stringify(notes))
    // for (let index = 0; index < newNotes.length; index++) {
    //     const element = newNotes[index];
    //     if (element._id === id) {
    //         element.title = title;
    //         element.description = description;
    //         element.tag = tag;
    //         break;
    //     }
    // }
    // setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;