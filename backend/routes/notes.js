import express from "express";
import Note from "../models/Note.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";

const notesRouter = express.Router();
//Route 1: Get all the notes using GET. api/notes/fetchallnotes  Login Required
notesRouter.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

//Route 2: Add note using POST. api/notes/addnote Login Required
notesRouter.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //If there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;

      //Create a note from request data
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      //Save note
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        message: error.message,
      });
    }
  }
);

//Route 3: Update note using PUT. api/notes/updatenote/:id Login Required
notesRouter.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //Create a new note object

    const updatedNote = {};
    if (title) updatedNote.title = title;
    if (description) updatedNote.description = description;
    if (tag) updatedNote.tag = tag;

    //Find Note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    // Check if the logged-in user owns the note
    if (note.user?.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
});

//Route 4: Delete note using DELETE. api/notes/deletenote/:id Login Required
notesRouter.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //Find Note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    // Check if the logged-in user owns the note
    if (note.user?.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", "Deleted Note": deletedNote });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
});
export default notesRouter;
