import "./App.css";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import NoteState from "./context/notes/NoteState.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Landing from "./components/Landing.js";
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message={"Amazing!"} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Landing />}></Route>
              <Route exact path="/notes" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
