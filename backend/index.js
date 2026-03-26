const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"))); // serve frontend

// Example backend route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form:", name, email, message);
  res.json({ status: "success", message: "Form received" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));