const User = require("../models/User");
const { validateSignup } = require("../rules/rules");
const jwt = require("jsonwebtoken");

// const handleErrors = (err) => {

// };

const maxAge = 3 * 24 * 60 * 60; //3days

const createToken = (id) => {
  return jwt.sign({ id }, "sanan karim secret code", { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  try {
    const { error, value } = validateSignup(req.body);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(422).json({
        error: errorMessages,
      });
    } else {
      const { email, password } = value;
      try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
      } catch (error) {
        let errors;

        if (error.code === 11000) {
          errors = "email already exsists";
          res.status(403).json(errors);
        }
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.login_post = async (req, res) => {
  // console.log(req.body); //app.use(express.json()); in app.js
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  res.send("user login");
};
