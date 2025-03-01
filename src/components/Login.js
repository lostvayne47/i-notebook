import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/login-style.css";
export default function Login({ showAlert }) {
  // const host = "localhost:5000";
  const host = "i-notebook-backend-liard.vercel.app";

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        mode: "cors",
        credentials: "include", // Add this if using authentication cookies
      });
      const json = await response.json();
      if (json.success) {
        //save the auth token and redirect
        localStorage.setItem("authToken", json.authToken);
        showAlert("Logged in successfully", "success");
        navigate("/notes");
      } else {
        showAlert(json.error, "danger");
      }
    } catch (e) {
      alert("Something went wrong");
      console.log(e.message);
    }
  };
  return (
    <div className="container login">
      <label htmlFor="login">
        <h1>Please Login</h1>
      </label>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
            autoComplete="email"
          />
          <label>We'll never share your email with anyone else.</label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            autoComplete="current-password"
          />
        </div>
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
    </div>
  );
}
