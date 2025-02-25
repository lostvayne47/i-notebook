import React from "react";

export default function Alert({ message }) {
  return (
    <div>
      <div
        className="alert alert-primary"
        role="alert"
        style={{ zIndex: "9999", margin: "0px" }}
      >
        {message}
      </div>
    </div>
  );
}
