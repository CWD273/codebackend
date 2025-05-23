const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const FILES_DIR = path.join(__dirname, "files");

// API to list files
app.get("/files", (req, res) => {
    fs.readdir(FILES_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(files);
    });
});

// API to read a file
app.get("/file/:name", (req, res) => {
    const filePath = path.join(FILES_DIR, req.params.name);
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ content: data });
    });
});

// API to save a file
app.post("/file/:name", (req, res) => {
    const filePath = path.join(FILES_DIR, req.params.name);
    fs.writeFile(filePath, req.body.content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "File saved successfully!" });
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
