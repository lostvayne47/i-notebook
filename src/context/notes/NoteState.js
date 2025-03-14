import NoteContext from "./NoteContext.js";
import { useState } from "react";

const NoteState = (props) => {
  // const host = "http://localhost:5000";
  const host = "i-notebook-backend-liard.vercel.app";
  const [notes, setNotes] = useState([]);
  const [loader, setLoader] = useState(false);

  //Get all notes
  const getNotes = async () => {
    try {
      // console.log("Getting all notes");
      setLoader(true);
      const response = await fetch(`https://${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        mode: "cors",
        credentials: "include", // Add this if using authentication cookies
      });
      const json = await response.json();
      //setNotes
      setNotes(json);
      setLoader(false);
    } catch (e) {
      alert("Something went wrong!");
      console.log(e.message);
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    try {
      // console.log("Adding a new note");
      setLoader(true);
      const response = await fetch(`https://${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        mode: "cors",
        credentials: "include", // Add this if using authentication cookies

        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
      setNotes(notes.concat(note));
      setLoader(false);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error.message);
    }
  };

  //Update a note
  const updateNote = async (id, title, description, tag) => {
    try {
      // console.log(`Updating ${id}`);
      setLoader(true);
      await fetch(`https://${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        mode: "cors",
        credentials: "include", // Add this if using authentication cookies

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
      setLoader(false);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error.message);
    }
  };

  //Delete a note
  const deleteNote = async (id) => {
    try {
      // console.log("Deleteing note " + id);
      setLoader(true);
      const response = await fetch(
        `https://${host}/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
          mode: "cors",
          credentials: "include", // Add this if using authentication cookies
        }
      );
      const json = await response.json();
      console.log(json?.Success);

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      setLoader(false);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loader,
        setLoader,
        getNotes,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
