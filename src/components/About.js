import React from "react";

export default function About() {
  return (
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div
        class="card p-4 shadow-lg"
        style={{
          maxWwidth: "500px",
          background: "linear-gradient(to left top, #73d5f0, #072d5c)",
          color: "white",
          borderTopLeftRadius: "100px",
          borderBottomRightRadius: "100px",
        }}
      >
        <h3 class="text-center mb-3">iNotebook</h3>
        <p>
          A <strong>Notes Application</strong> that allows users to create,
          read, update, and delete (CRUD) notes efficiently. Users can organize
          their notes with titles and descriptions, search for specific notes,
          and categorize them for better accessibility. The app provides a
          clean, user-friendly interface with options to save, edit, and remove
          notes seamlessly. Ideal for personal and professional use, it ensures
          data persistence and quick retrieval.
        </p>
      </div>
    </div>
  );
}
