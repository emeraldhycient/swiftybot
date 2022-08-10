require("dotenv").config();
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const Webhook = require("./src/routes/Webhook");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creating 24 hours from milliseconds
//const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(
  sessions({
    secret: process.env.SESSION_KEY,
    saveUninitialized: true,
    cookie: { maxAge: 120000 },
    resave: false,
  })
);

// cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("yo meet swifty the archive bot 🤖");
});

app.use("/bot", Webhook);

app.use("*", (req, res) => res.status(404).send("404 Not Found"));

const port = 1908;
app.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${port}`)
);
