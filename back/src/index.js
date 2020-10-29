const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors()); // CORS 설정

const knex = require("knex");
const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    database: "movie_db",
    password: "0212", // .gitignore 처리 해야함.
  },
}); // DB 연결 부분

app.get("/movies", (req, res) => {
  db.raw(`SELECT * FROM movie`)
    .then((response) => {
      res.status(200).send(response[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end("Error");
    });
});

app.post("/movie", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  db.raw(`INSERT INTO movie(name, price) VALUES("${name}", ${price})`)
    .then(() => {
      res.status(200).send("SUCCESS");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end("Error");
    });
});

app.delete("/movie", (req, res) => {
  // DELETE http://localhost:5000/movie?id=1
  const id = req.query.id;

  db.raw(`DELETE FROM movie WHERE id=${id}`)
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end("Error");
    });
});

app.listen(5000, () => {
  console.log("Server is running now!");
});
