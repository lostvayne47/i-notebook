import express from "express";
import UserSchema from "../models/User.js";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";

const authRouter = express.Router();

//Create a User using POST "/api/auth" . Doesn't require Auth

authRouter.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Passowrd must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((error) => {
        if (error.code === 11000) {
          // Duplicate key error
          return res.status(400).json({
            error: "Email already exists",
            message: error.message,
          });
        }
        console.error(error);
        res.status(500).json({ error: "Server error" });
      });
  }
);
export default authRouter;
