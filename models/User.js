const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//This post doesn't refers to post requests. It refers to specific event occured in userSchema and call this function after that event.
//first argument action perfermed and second is a function. That function will be fired when
// userSchema.post("save", function (doc, next) {
//   console.log("new user created", doc);
//   next();
// });

//before an action is saved in db
userSchema.pre("save", async function (next) {
  console.log("user about to be created", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Invalid Email & Password");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
