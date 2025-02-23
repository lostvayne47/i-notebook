import NoteContext from "./NoteContext.js";
import { useState } from "react";

const NoteState = (props) => {
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
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
