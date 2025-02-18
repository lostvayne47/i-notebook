import NoteContext from "./NoteContext.js";
import { useState } from "react";

const NoteState = (props) => {
  const [state, setState] = useState({});

  return (
    <NoteContext.Provider value={{ state, setState }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
