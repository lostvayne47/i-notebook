import React, { useState } from "react";
export default function Modal({ note }) {
  const [editNote, setEditNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  const onChange = (e) => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };
  const onSave = (e) => {
    console.log(editNote);
  };
  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    value={editNote.title}
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
                    value={editNote.description}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag">Choose a tag</label>
                  <select
                    className="form-select"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    value={editNote.tag}
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="sport">Sport</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
