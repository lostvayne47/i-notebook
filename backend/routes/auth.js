import express from "express";
import UserSchema from "../models/User.js";

const authRouter = express.Router();

//Create a User using POST "/api/auth" . Doesn't require Auth

authRouter.post("/", (req, res) => {
  try {
    const user = UserSchema(req.body); // ✅ Use `new User()` instead of `UserSchema()`
    user.save(); // ✅ Await saving to database
    console.log("User saved successfully");
    res.sendStatus(201); // ✅ 201 Created status for successful user creation
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message); // ✅ Send error response to client
  }
});
export default authRouter;
