const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "groceries_db"
});

connection.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the items in it.
app.get("/groceries.html", (req, res) => {
  connection.query("SELECT * FROM groceries;", (err, data) => {
    if (err) {
      return res.status(500).end();
    }

    res.render("groceries", { groceries: data });
  });
});

// Create a new grocery item
app.post("/api/groceries", (req, res) =>{
  connection.query("INSERT INTO groceries (name) VALUES (?)", [req.body.item], (err, result) => {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new movie
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Retrieve all groceries
app.get("/api/groceries", (req, res) => {
  connection.query("SELECT * FROM groceries;", (err, data) => {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// Update an item
app.put("/api/groceries/:id", (req, res) => {
  connection.query("UPDATE groceries SET grocerie = ? WHERE id = ?", [req.body.movie, req.params.id], (err, result) => {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a grocery item
app.delete("/api/groceries/:id", (req, res) => {
  connection.query("DELETE FROM groceries WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
