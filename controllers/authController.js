const User = require("../models/User");
const { validateSignup } = require("../rules/rules");

const handleErrors = (err) => {
  let errors = { message: "", code: "" };
  if (err.code === 11000) {
    errors.message = "email already exsists";
    errors.code = 403;
    return errors;
  }
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { error, value } = validateSignup(req.body);
  console.log("testing1");
  if (error) {
    console.log("testing2");

    return res.status(400).json({ error: error.message });
  } else {
    const { email, password } = value;
    try {
      console.log(email, password);
      console.log("testing 3");
      const user = await User.create({ email, password });
      console.log("testing4");

      res.status(201).json(user);
    } catch (error) {
      const errors = handleErrors(error);
      console.log("testing 5");
      console.log(error);
      res.status(400).json({ errors });
    }
  }
};

module.exports.login_post = async (req, res) => {
  // console.log(req.body); //app.use(express.json()); in app.js
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  res.send("user login");
};
