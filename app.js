/**
 * Handles all requests to the server that do not match any defined routes.
 * If a route is not found, it will return a 404 status code and a message.
 * If an error occurs, it will log the error and return a 500 status code.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
import express from "express"; // Import the Express.js library
import { fileURLToPath } from "url"; // Import the fileURLToPath function from the url module
import path from "path"; // Import the path module
import logger from "./logger.js"; // Import the logger module
import data from "./data.js"; // Import the data module
import { getNotes, getNote, createNote } from "./database.js"; // Import functions from the database module

const app = express(); // Create an instance of the Express.js application
const port = process.env.PORT; // Get the port number from the environment variable
let people = data.people; // Get the people data from the data module

const __filename = fileURLToPath(import.meta.url); // Get the current file URL and convert it to a path
const __dirname = path.dirname(__filename); // Get the directory path of the current file

app.use(express.json()); // Parse JSON request bodies
app.use(express.static("./public")); // Serve static files from the "public" directory

// Route for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html")); // Serve the index.html file
});

// Route for getting all notes
app.get("/notes", async (req, res) => {
  const notes = await getNotes(); // Get all notes from the database
  res.status(200).send(notes); // Send the notes as the response
});

// Route for getting a specific note by ID
app.get("/notes/:id", async (req, res) => {
  const id = req.params.id; // Get the note ID from the request parameters
  const note = await getNote(id); // Get the note from the database
  res.status(200).send(note); // Send the note as the response
});

// Route for creating a new note
app.post("/notes", async (req, res) => {
  const { title, contents } = req.body; // Get the title and contents from the request body
  const note = await createNote(title, contents); // Create a new note in the database
  res.status(201).send(note); // Send the new note as the response
});

// Route for getting people data
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people }); // Send the people data as a JSON response
});

// Route for handling non-existent routes
app.all("*", [logger], async (req, res) => {
  res.status(404).send("Sorry this route does not exist."); // Send a 404 response for non-existent routes
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send("Something broke 😒"); // Send a 500 response for server errors
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Log a message when the server starts
});
