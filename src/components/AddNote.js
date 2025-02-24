import React, { useContext } from "react";
import { useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote() {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "personal",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    //setNote({ title: "", description: "", tag: "personal" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="titleHelp"
            onChange={onChange}
            minLength={1}
            placeholder="Title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            onChange={onChange}
            minLength={1}
            placeholder="Description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag">Choose a tag</label>
          <select
            className="form-select"
            id="tag"
            name="tag"
            onChange={onChange}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="sport">Sport</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          disabled={
            note?.title?.length === 0 || note?.description?.length === 0
          }
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
