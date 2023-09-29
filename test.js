import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.all("*", async (req, res) => {
  res.status(404).send("Sorry, this route does not exist.");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
