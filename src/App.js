import "./App.css";
import Navbar from "./components/Navbar.js";
import Notes from "./components/Notes.js";
import About from "./components/About.js";
import NoteState from "./context/notes/NoteState.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Landing from "./components/Landing.js";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Landing />}></Route>
              <Route
                exact
                path="/notes"
                element={<Notes showAlert={showAlert} />}
              ></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
