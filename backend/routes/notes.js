import express from "express";
import Note from "../models/Note.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";

const notesRouter = express.Router();
//Route 1: Get all the notes. Login Required
notesRouter.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

//Route 2: Add note. Login Required

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
export default notesRouter;
