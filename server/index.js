const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/Auths");

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

// app.use(cors());

const db = require("./models");

// jwt

app.get("*", checkUser);
app.get("/api/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user);
});

// routes
const userRoutes = require("./routes/User");
const TransactionsRoutes = require("./routes/Transactions");

app.use("/api/user", userRoutes);
app.use("/api/transaction", TransactionsRoutes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
  });
});
