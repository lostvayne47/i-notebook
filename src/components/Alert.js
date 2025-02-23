import React from "react";

export default function Alert({ message }) {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        {message}
      </div>
    </div>
  );
}
