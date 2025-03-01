import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoteContext from "../context/notes/NoteContext";

export default function MyModal({ note, show, handleClose }) {
  const { loader, updateNote } = useContext(NoteContext);

  const [editNote, setEditNote] = useState({});

  const onChange = (e) => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };
  const onSave = (e) => {
    updateNote(editNote.id, editNote.title, editNote.description, editNote.tag);
    handleClose();
  };

  useEffect(() => {
    setEditNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  }, [note]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label
                htmlFor="title"
                className="form-label text-dark required-field"
              >
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
              <sub className="text-dark">Please enter atleast 5 characters</sub>
            </div>

            <div className="mb-3">
              <label
                htmlFor="description"
                className="form-label text-dark required-field"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                onChange={onChange}
                value={editNote.description}
                rows={"10"}
              />
              <sub className="text-dark">Please enter atleast 5 characters</sub>
            </div>

            <div className="mb-3">
              <label htmlFor="tag" className="text-dark">
                Choose a tag
              </label>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={
              loader ||
              editNote?.title?.length < 5 ||
              editNote?.description?.length < 5
            }
            onClick={onSave}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
