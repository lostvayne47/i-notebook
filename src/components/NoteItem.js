import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Modal from "./Modal.js";

export default function NoteItem({ note }) {
  const { deleteNote } = useContext(NoteContext);

  const handleEdit = (note) => {
    // console.log("Editing note " + note._id);
    handleShow();
  };
  const handleDelete = (id) => {
    deleteNote(id);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="col-md-3" style={{ minHeight: "10rem", padding: "10px" }}>
        <div className="card my-1" style={{ height: "100%" }}>
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between align-items-center     flex-wrap-reverse ">
              <div> {note.title}</div>
              <div className={`tag ${note.tag}-tag`}>
                {note.tag.toString().toUpperCase()}
              </div>
            </h5>
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
                onClick={() => handleEdit(note)}
              ></i>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => handleDelete(note._id)}
              ></i>
            </div>
          </div>
        </div>
        {
          <Modal
            note={note}
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        }
      </div>
    </>
  );
}
