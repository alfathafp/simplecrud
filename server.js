const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  database: "learn",
  user: "root",
  password: "root",
  port: "8889",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected");

  // for getting data
  app.get("/", (req, res) => {
    const sql2 = "SELECT * FROM user";
    db.query(sql2, (err, result) => {
      const users2 = JSON.parse(JSON.stringify(result));
      console.log("hasil db -> ", users2);
      res.render("index", { users2: users2, title: "Daftar Murid" });
    });
  });

  // for insertting data

  app.post("/add-data", (req, res) => {
    const insertSql = `INSERT INTO user (first_name, last_name, email, gender) VALUES('${req.body.name}',
          '${req.body.last_name}', '${req.body.email}', '${req.body.gender}');`;

    db.query(insertSql, (err, result) => {
      if (err) {
        throw err;
      }
      // If the query is successful, redirect to the homepage
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("server ready");
});
