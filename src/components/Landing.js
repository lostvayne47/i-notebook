import React from "react";
import { Link } from "react-router-dom";
export default function Landing() {
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
          <Link className="btn btn-primary" to="/login" role="button">
            Login
          </Link>
          <Link className="btn btn-primary" to="/signup" role="button">
            Signup
          </Link>
        </form>
      </main>
    </div>
  );
}
