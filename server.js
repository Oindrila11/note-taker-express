const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require("fs");
const path = require("path");
const {v4:uuidv4} = require("uuid");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
const notes = require("./db/db.json");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.post("/api/notes", (req, res) => {
    req.body.id = uuidv4();
    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notes, null, 2));
    res.json(notes);
});





app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
  })