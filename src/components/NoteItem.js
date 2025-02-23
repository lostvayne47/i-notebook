import React from "react";

export default function NoteItem({ note }) {
  return (
    <div className="col-md-3">
      <div className="card my-1">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-2"></i>
          <i className="fa-solid fa-edit mx-2"></i>
        </div>
      </div>
    </div>
  );
}
