import React from "react";

export default function NoteItem({ note }) {
  return (
    <div className="col-md-3">
      <div class="card my-1">
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
