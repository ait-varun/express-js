// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3001;

// // this on client
// app.get("/api", (req, res) => {
//   res.send({
//     message: "This is from express server backend update",
//     people: {
//       name: [
//         { name: "Jessie Mendez" },
//         { name: "Lena Brady" },
//         { name: "Isaiah Paul" },
//         { name: "Scott Cruz" },
//         { name: "Lizzie Roberts" },
//         { name: "Stella Simon" },
//         { name: "Lois Armstrong" },
//       ],
//     },
//   });
// });

// // this on server
// app.listen(port, () => {
//   console.log(`Example app listening on this port ${port}`);
// });

import express from "express";

import { getNotes, getNote, createNote } from "./database.js";

const app = express();

app.use(express.json());

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(201).send(note);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
