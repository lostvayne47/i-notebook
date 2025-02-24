import NoteContext from "./NoteContext.js";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  //Get all notes
  const getNotes = async () => {
    try {
      console.log("Getting all notes");
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiMDhmMzk3YzUyNjdiNjIwZTFjNWMwIn0sImlhdCI6MTczOTg2MTE0OH0.wV0sAL6-axaTmt0BUgkdWtvEOHUTNSR0f3VGcoJFnyw",
        },
      });
      const json = await response.json();
      //setNotes
      setNotes(json);
    } catch (e) {
      console.log(e.message);
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    try {
      console.log("Adding a new note");
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiMDhmMzk3YzUyNjdiNjIwZTFjNWMwIn0sImlhdCI6MTczOTg2MTE0OH0.wV0sAL6-axaTmt0BUgkdWtvEOHUTNSR0f3VGcoJFnyw",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.log(error.message);
    }
  };

  //Update a note
  const updateNote = async (id, title, description, tag) => {
    try {
      console.log(`Updating ${id}`);
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiMDhmMzk3YzUyNjdiNjIwZTFjNWMwIn0sImlhdCI6MTczOTg2MTE0OH0.wV0sAL6-axaTmt0BUgkdWtvEOHUTNSR0f3VGcoJFnyw",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      //Update Frontend
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id
            ? { ...note, title, description, tag, date: Date.now() }
            : note
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  //Delete a note
  const deleteNote = async (id) => {
    try {
      console.log("Deleteing note " + id);
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiMDhmMzk3YzUyNjdiNjIwZTFjNWMwIn0sImlhdCI6MTczOTg2MTE0OH0.wV0sAL6-axaTmt0BUgkdWtvEOHUTNSR0f3VGcoJFnyw",
        },
      });
      const json = await response.json();
      console.log(json?.Success);

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, updateNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
