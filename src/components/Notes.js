import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: '', etitle: '', edesc: '', etag: '' });
  const ref = useRef(null);
  const closeRef = useRef(null);
     const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
  }
  else{
    navigate('/login');
  }
  // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id || '',
      etitle: currentNote.title || '',
      edesc: currentNote.desc || '',
      etag: currentNote.tag || '',
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await editNote(note.id, note.etitle, note.edesc, note.etag);
    closeRef.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Title"
                    value={note.etitle || ''}  // Ensure it's always a string
                    onChange={onChange}
                  />
                  <label htmlFor="etitle">Title</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="edesc"
                    name="edesc"
                    placeholder="Description"
                    value={note.edesc || ''}  // Ensure it's always a string
                    onChange={onChange}
                  />
                  <label htmlFor="edesc">Description</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Tag"
                    value={note.etag || ''}  // Ensure it's always a string
                    onChange={onChange}
                  />
                  <label htmlFor="etag">Tag</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && <p>No notes to display</p>}
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
