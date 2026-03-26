const db = require("./database");

db.all("SELECT * FROM messages", [], (err, rows) => {
  if (err) throw err;
  console.log(rows);
  process.exit();
});
