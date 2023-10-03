//TODO: working

import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import logger from "./logger.js";
import data from "./data.js";
const port = process.env.PORT;
import { getNotes, getNote, createNote } from "./database.js";

const app = express();

let people = data.people;
app.use(express.json());
app.use(express.static("./public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/index.html"));
});
app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.status(200).send(notes);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.status(200).send(note);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(201).send(note);
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
//send response to all routes which are not defined/exist
app.all("*", [logger], async (req, res) => {
  res.status(404).send("Sorry this route does not exist.from app");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 😒");
});

app.listen(port, () => {
  console.log("Server is running on port 8080");
});
