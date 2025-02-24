import NoteContext from "./NoteContext.js";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "67b462196cc4285c4d50de6f",
      user: "67b08f397c5267b620e1c5c0",
      title: "My Title Changed",
      description: "Default Description Changed",
      tag: "personal Changed",
      date: "2025-02-18T10:32:52.748Z",
      __v: 0,
    },
    {
      _id: "67bae6a382e879d4b6656a60",
      user: "67b08f397c5267b620e1c5c0",
      title: "My Title 1",
      description: "Default Description 1",
      tag: "personal",
      date: "2025-02-23T08:44:35.693Z",
      __v: 0,
    },
    {
      _id: "67bae6a982e879d4b6656a62",
      user: "67b08f397c5267b620e1c5c0",
      title: "My Title 2",
      description: "Default Description 2",
      tag: "personal",
      date: "2025-02-23T08:44:35.693Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  //Add a note
  //TODO: API CALL
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note");
    //TODO: API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiMDhmMzk3YzUyNjdiNjIwZTFjNWMwIn0sImlhdCI6MTczOTg2MTE0OH0.wV0sAL6-axaTmt0BUgkdWtvEOHUTNSR0f3VGcoJFnyw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    const newNote = {
      _id: "67b462196cc4285c4d50de6f",
      user: "67b08f397c5267b620e1c5c0",
      title: title,
      description: description,
      tag: tag,
      date: Date.now(),
      __v: 0,
    };
    setNotes(notes.concat(newNote));
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //TODO: API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiMDhmMzk3YzUyNjdiNjIwZTFjNWMwIn0sImlhdCI6MTczOTg2MTE0OH0.wV0sAL6-axaTmt0BUgkdWtvEOHUTNSR0f3VGcoJFnyw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    //TODO: Logic to edit in backend
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  //Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
