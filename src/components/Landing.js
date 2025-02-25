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

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      {/* Hero Section */}
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center mt-5">
        <h2 className="display-4 fw-bold text-dark">Welcome to iNotebook</h2>
        <p className="lead text-secondary">
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
