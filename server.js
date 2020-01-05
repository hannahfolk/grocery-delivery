const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "groceries_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the html pages with the plans in it.
app.get("/", function(req, res) {
  res.render("index");
});

app.get("/groceries", (req, res) => {
  connection.query("SELECT * FROM groceries;", (err, data) => {
    if (err) {
      return res.status(500).end();
    }

    res.render("items", { groceries: data });
  });
});

// This isn't working - just gets a message saying page can't load right now. Originally it was a normal get call like the one above. The if statement was my attempt to get it working even if there was no data in the query call.
// app.get("/cart", function(req, res) {
//   connection.query("SELECT * FROM cart;", (err, data) => {
//     if (err) {
//       return res.status(500).end();
//     } if (!data) {
//       res.send("cart.html");
//     } else {
//       res.render("cart", { cart: data });
//     }
//   });
// });

// post requests
app.post("/groceries", function(req, res) {
  connection.query(
    "INSERT INTO cart (unit_name, unit_price, unit_image) VALUES (?, ?, ?)",
    [req.body.unit_name, req.body, unit_price, unit_image],
    (err, data) => {
      if (err) {
        return res.status(500).end();
      }
      res.redirect("/groceries");
      console.log("you have successfully added item to your cart!");
    }
  );
});

// update requests
app.put("/groceries", function(req, res) {
  connection.query(
    "UPDATE groceries SET quantity = quantity - 1 WHERE unit_name = ?",
    req.params.unit_name,
    (err, data) => {
      if (err) {
        return res.status(500).end();
      }
      res.redirect("/groceries");
    }
  );
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
