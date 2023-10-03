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

//TODO: working

import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import logger from "./logger.js";

import { getNotes, getNote, createNote } from "./database.js";

const app = express();

app.use(express.json());
app.use(express.static("./public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const logger = (req, res, next) => {
//   const method = req.method;
//   const url = req.url;
//   const time = new Date().getFullYear();
//   console.log(method, url, time);
//   // res.send("testing");  // this will show on this route
//   next();
// };

app.get("/home", (req, res) => {
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

//send response to all routes which are not defined/exist
app.all("*", logger, async (req, res) => {
  // const method = req.method;
  // const url = req.url;
  // console.log(method, url);
  res.status(404).send("Sorry this route does not exist.from app");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 😒");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});


