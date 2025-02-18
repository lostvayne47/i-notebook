import NoteContext from "./NoteContext.js";
import { useState } from "react";

const NoteState = (props) => {
  const baseState = {
    name: "Aayush",
    class: 10,
  };
  const [state, setState] = useState(baseState);

  return (
    <NoteContext.Provider value={{ state, setState }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
