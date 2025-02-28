import connectToMongo from "./db.js";
import express from "express";
import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";
import cors from "cors";
connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
//Available Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.use("/", (req, res) => {
  res.send("Welcome to iNotebook");
});
app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`);
});
