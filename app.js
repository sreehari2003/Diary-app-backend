const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const appError = require("./utils/appError");
const authrouter = require("./routes/authRoute");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//express config settings
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

dotenv.config();
const sessionConfig = {
  secret: "thisisthekey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
  app.use(session(sessionConfig));
}
const connectDB = async () => {
  const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (e) {
    console.log("error connecting to database");
  }
};

connectDB();

//routes//
//for authentication
app.use("/api", authrouter);

//error handler for
// all = get,post,etc etc requests
app.all("*", (req, res, next) => {
  next(
    new appError(`The requested page ${req.originalUrl} was not found`),
    404
  );
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    ok: false,
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
