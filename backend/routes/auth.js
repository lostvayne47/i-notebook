import express from "express";
import UserSchema from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const authRouter = express.Router();

const JWT_SECRET = "AAYUSH_IS_THE_BEST";

//Create a User using POST "/api/auth/createuser" . Doesn't require Auth No Login Required

authRouter.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Passowrd must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check if user exists already
      let user = await UserSchema.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "Email already exists",
        });
      } else {
        //If not then create user

        const salt = (await bcrypt.genSalt(10)).toString();
        const secPass = (await bcrypt.hash(req.body.password, salt)).toString();

        user = await UserSchema.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        //Show what was sent as response
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken: authToken });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        message: error.message,
      });
    }
  }
);

export default authRouter;
