import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function Navbar() {
  let location = useLocation();
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

  const handleLogout = () => {
    setLoggedStatus(false);
    navigate("/");
    localStorage.removeItem("authToken");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex gap-3">
              <Link
                hidden={loggedStatus}
                className="btn btn-primary"
                to={loggedStatus ? "#" : "/login"}
                role="button"
              >
                Login
              </Link>
              <Link
                hidden={loggedStatus}
                className="btn btn-primary"
                to={loggedStatus ? "#" : "/signup"}
                role="button"
              >
                Signup
              </Link>
              <Link
                hidden={!loggedStatus}
                className="btn btn-primary"
                to="/"
                role="button"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
