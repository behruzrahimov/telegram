import express from "express";
import cors from "cors";
import postgres from "pg";

//Client
const { Client } = postgres;

//create Port
const port = 5000;

//App
const app = express();
app.use(cors());
app.use(express.json());

//post Messages
app.post("/messages-save", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "15092002",
    database: "postgres",
  });
  await client.connect();
  await client.query(
    `INSERT INTO message(sender,receiver,text)VALUES($1,$2,$3)`,
    [req.body.sender, req.body.receiver, req.body.text]
  );
  await client.end();
  res.send("message added!");
});

//post contacts
app.post("/contact-save", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "15092002",
    database: "postgres",
  });
  await client.connect();
  await client.query(
    `INSERT INTO contact(name,surname,number)VALUES($1,$2,$3)`,
    [req.body.name, req.body.surname, req.body.number]
  );
  await client.end();
  res.send("conatct added!");
});

//get Messages
app.get("/messages-list", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "15092002",
    database: "postgres",
  });
  await client.connect();
  const result = await client.query('SELECT * FROM "message"');
  await client.end();
  res.json(result.rows);
});

//get contacts
app.get("/contact-list", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "15092002",
    database: "postgres",
  });
  await client.connect();
  const result = await client.query('SELECT * FROM "contact"');
  await client.end();
  res.json(result.rows);
});

//server
app.get("/", (req, res) => {
  res.json("server working");
});

//listening Port
app.listen(port, () => {
  console.log(`Example app listening port http://localhost:${port}`);
});
