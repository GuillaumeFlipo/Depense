const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  checkUser,
  requireAuth,
  requireAuthForAPI,
} = require("./middleware/Auths");
const path = require("path");
const Ddos = require("ddos");
var ddos = new Ddos({ burst: 15, limit: 15 });
// const shell = require("shelljs");

// shell.exec("node index.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(ddos.express);

// app.use(cors());

const db = require("./models");

// jwt

// app.get("*", checkUser);
app.get("/api/jwtid", checkUser, (req, res) => {
  res.status(200).send(res.locals.user);
});

// routes
const userRoutes = require("./routes/User");
const TransactionsRoutes = require("./routes/Transactions");
const CategoriesRoutes = require("./routes/Categories");
const DepensesEventRoutes = require("./routes/DepensesEvents");
const TransactionRecRoutes = require("./routes/TransactionRec");

app.use("/api/user", userRoutes);
app.use("/api/transaction", TransactionsRoutes);
app.use("/api/categorie", CategoriesRoutes);
app.use("/api/depensesEvent", DepensesEventRoutes);
app.use("/api/transactionRec", TransactionRecRoutes);

// Handles any requests that don't match the ones above

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public_html", "index.html"));
// });

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
  });
});

// // db.sequelize.sync().then(() => {
// //   app.listen('passenger', '127.0.0.1', () => {
// //     console.log(`running on port ${process.env.PORT}`);
// //   });
// // });

// const opener = require("opener");
// var express = require("express");
// var ddos = new Ddos({
//   burst: 4,
//   limit: 4,
//   testmode: true,
// });
// var app = express();
// app.use(ddos.express);
// app.get("/", (req, res, next) => {
//   console.log("Beep");
//   res.end("Boop");
// });
// app.listen(5150, () => {
//   opener("http://127.0.0.1:5150");
// });
