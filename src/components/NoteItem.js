import React, { useContext, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Modal from "../components/Modal.js";
export default function NoteItem({ note }) {
  const { deleteNote, editNote } = useContext(NoteContext);
  const ref = useRef(null);
  const handleEdit = (note) => {
    console.log("editing note " + note._id);
  };
  const handleDelete = (id) => {
    console.log(id);
    deleteNote(id);
  };
  return (
    <>
      <div
        className="col-md-3 mx-2"
        style={{ minHeight: "10rem", padding: "10px" }}
      >
        <div className="card my-1" style={{ height: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                padding: "5px",
              }}
            >
              <i
                className="fa-solid fa-edit mx-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleEdit(note)}
              ></i>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => handleDelete(note._id)}
              ></i>
            </div>
          </div>
        </div>
      </div>
      {<Modal note={note} />}
    </>
  );
}
