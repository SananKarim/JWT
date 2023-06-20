module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("new signup");
};

module.exports.login_post = (req, res) => {
  // console.log(req.body); //app.use(express.json()); in app.js
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  res.send("user login");
};
