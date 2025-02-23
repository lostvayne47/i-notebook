import React from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const { notes, addNote, editNote, deleteNote } = useContext(NoteContext);

  return (
    <>
      <AddNote addNote={addNote} />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note}></NoteItem>;
        })}
      </div>
    </>
  );
}
