require("dotenv").config();
const express = require("express");
const app = express();

const Webhook = require("./src/routes/Webhook");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("yo meet swifty the archive bot 🤖");
});

app.use("/bot", Webhook);

const port = 1908;
app.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${port}`)
);
