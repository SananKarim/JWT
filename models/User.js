const mongoose = require("mongoose");

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
userSchema.post("save", function (doc, next) {
  console.log("new user created", doc);
  next();
});

//before an action is saved in db
userSchema.pre("save", function (next) {
  console.log("user about to be created", this);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
