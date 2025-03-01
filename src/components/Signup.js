import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/css/signup-style.css";
import NoteContext from "../context/notes/NoteContext";
import Loader from "./Loader";

export default function Signup({ showAlert }) {
  // const host = "localhost:5000";
  const host = "i-notebook-backend-liard.vercel.app";
  const { loader, setLoader } = useContext(NoteContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const response = await fetch(`https://${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
        mode: "cors",
        credentials: "include", // Add this if using authentication cookies
      });
      const json = await response.json();
      if (json.success) {
        showAlert("Account created successfully", "success");
        navigate("/login");
      } else {
        showAlert(json.error, "danger");
      }
      setLoader(false);
    } catch (error) {
      alert("Something went wrong");
      console.log(e.message);
    }
  };
  return (
    <div className="signup outer-box">
      <div className="inner-box">
        <header className="signup-header">
          <h1>Signup</h1>
          <p>It just takes 30 seconds</p>
        </header>
        <main className="signup-body">
          <form onSubmit={handleSubmit} className="" id="signup-form">
            <p>
              <label htmlFor="name" className="required-field">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
                onChange={onChange}
                value={credentials.name}
                autoComplete="name"
              />
            </p>
            <p>
              <label htmlFor="email" className="required-field">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
                required
                onChange={onChange}
                value={credentials.email}
                autoComplete="email"
              />
            </p>
            <p>
              <label htmlFor="password" className="required-field">
                Your New Passowrd
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Atleast 8 characters long"
                required
                onChange={onChange}
                value={credentials.password}
                autoComplete="current-password"
              />
            </p>
            <p>
              {loader ? (
                <Loader />
              ) : (
                <button
                  disabled={
                    credentials.email.name === 0 ||
                    credentials.email.length === 0 ||
                    credentials.password.length < 8
                  }
                  type="submit"
                  id="submit"
                >
                  Create an account
                </button>
              )}
            </p>
          </form>
        </main>
        <footer className="signup-footer">
          <p>
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
