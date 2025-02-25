import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [loggedStatus, setLoggedStatus] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setLoggedStatus(true);
      navigate("/notes");
    } else {
      setLoggedStatus(false);
    }
  }, [navigate]);

  const style = {
    background: "linear-gradient(to left top, #73d5f0, #072d5c)",
    color: "white",
    margin: "15% auto",
    height: "50vh",
    width: "50vw",
    borderBottomLeftRadius: "100px",
    borderTopRightRadius: "100px",
  };
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center text-center"
      style={style}
    >
      {/* Hero Section */}
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center mt-5">
        <h2 className="display-4 fw-bold text-light">Welcome to iNotebook</h2>
        <p className="lead">
          Discover amazing content and join our community. <br />
          By Logging in or signing up
        </p>
        <form className="d-flex gap-3">
          <Link
            hidden={loggedStatus}
            className="btn btn-primary"
            to="/login"
            role="button"
          >
            Login
          </Link>
          <Link
            hidden={loggedStatus}
            className="btn btn-primary"
            to="/signup"
            role="button"
          >
            Signup
          </Link>
        </form>
      </main>
    </div>
  );
}
