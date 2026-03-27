const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./message.db");

// Create table
db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  message TEXT,
  date TEXT
)`);

// TEST ROUTE (important for Render)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// SEND MESSAGE
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
      res.json({ success: true });
    }
  );
});

// GET MESSAGES (FIXED ROUTE NAME)
app.get("/api", (req, res) => {
  db.all("SELECT * FROM messages ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.json({ success: false, error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));