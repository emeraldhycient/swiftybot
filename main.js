require("dotenv").config();
const express = require("express");
const app = express();

const dictionary = require("./src/helpers/dictionary");
const Webhook = require("./src/routes/Webhook");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("yo meet swifty the archive bot 🤖");
});

app.use("/bot", Webhook);

app.use("*", (req, res) => res.status(404).send("404 Not Found"));

const port = 1908;
app.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${port}`)
);

//dictionary();
