const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();

// FIX 1: Use the port Render gives you, or 3000 locally
const PORT = process.env.PORT || 3000;

// FIX 2: Open CORS so your Vercel site can connect
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use(bodyParser.json());

const db = new sqlite3.Database("./message.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite DB ✅");
});

db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  message TEXT,
  date TEXT
)`);

app.post("/submit-message", (req, res) => {
  const { name, email, message } = req.body;
  const date = new Date().toISOString();

  if (!name || !email || !message) {
    return res.json({ success: false, error: "All fields required" });
  }

  db.run(
    "INSERT INTO messages (name, email, message, date) VALUES (?, ?, ?, ?)",
    [name, email, message, date],
    function (err) {
      if (err) return res.json({ success: false, error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.get("/messages", (req, res) => {
  db.all("SELECT * FROM messages ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.json({ success: false, error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
