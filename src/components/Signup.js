import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/css/signup-style.css";

export default function Signup({ showAlert }) {
  const host = "localhost:5000";
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
      const response = await fetch(`http://${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        showAlert("Account created successfully", "success");
        navigate("/login");
      } else {
        showAlert(json.error, "danger");
      }
    } catch (error) {
      console.log(error.message);
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
              <label htmlFor="name">Full Name</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Your New Passowrd</label>
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
