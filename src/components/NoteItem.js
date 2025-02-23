import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
export default function NoteItem({ note }) {
  const { deleteNote, editNote } = useContext(NoteContext);
  const handleEdit = (id) => {
    console.log("editing");
  };
  const handleDelete = (id) => {
    console.log(id);
    deleteNote(id);
  };
  return (
    <div className="col-md-3">
      <div className="card my-1">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-edit mx-2"
            onClick={() => handleEdit(note._id)}
          ></i>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => handleDelete(note._id)}
          ></i>
        </div>
      </div>
    </div>
  );
}
