import React, { useEffect } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const { notes, getNotes } = useContext(NoteContext);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && (
          <div className="container d-flex justify-content-center align-items-center">
            <h2>No notes to display, add a Note!</h2>
          </div>
        )}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note}></NoteItem>;
        })}
      </div>
    </>
  );
}
