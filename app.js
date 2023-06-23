const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb+srv://sanan:1234@cluster0.a3ydmjf.mongodb.net/jwt";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));

app.get("/smoothies", (req, res) => res.render("smoothies"));

// //cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");

//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, { maxAge: 1000 * 60 * 60 * 24 }); //secure: true can also be added. this will only allow for HTTPS. Always use this in production.

//   res.send("you got the cookie");
// });

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.newUser);

//   res.json(cookies);
// });




app.use(authRoutes);
