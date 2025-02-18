import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function About() {
  const a = useContext(NoteContext);
  return (
    <div>
      This is about {a.state.name} from class {a.state.class}
    </div>
  );
}
