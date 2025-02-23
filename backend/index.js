import connectToMongo from "./db.js";
import express from "express";
import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
//Available Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.use("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`);
});
