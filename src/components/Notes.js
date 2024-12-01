import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'

const Notes = () => {

  const context = useContext(NoteContext);
  // if (!context) {
  //   return <div>Error: Context is not available</div>;
  // }

  const { notes } = context;
  return (
    <>
      < AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} />;
        })}
      </div>
    </>
  )
}

export default Notes