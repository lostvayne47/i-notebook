import express from "express";
import UserSchema from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.js";

const authRouter = express.Router();

const JWT_SECRET = "AAYUSH_IS_THE_BEST";

//Route 1: Create a User using POST "/api/auth/createuser" . Doesn't require Auth No Login Required

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
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors
          .array()
          .map((e) => e.msg)
          .join(" "),
      });
    }
    try {
      //Check if user exists already
      let user = await UserSchema.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
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
        success = true;
        res.json({ success, authToken: authToken });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        message: error.message,
      });
    }
  }
);

// Route 2: Authenticate a User using POST "/api/auth/login" . Doesn't require Auth No Login Required

authRouter.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors
          .array()
          .map((e) => e.msg)
          .join(" "),
      });
    }
    try {
      const { email, password } = req.body;
      let user = await UserSchema.findOne({ email });

      if (!user) {
        return res.status(400).json({
          error: "Please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      } else {
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken: authToken });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        message: error.message,
      });
    }
  }
);

// Route 3: Get Logged in User Details using POST "/api/auth/getuser".Login Required

authRouter.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await UserSchema.findById(userId).select("-password");
    res.send(userDetails);
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
});

export default authRouter;
