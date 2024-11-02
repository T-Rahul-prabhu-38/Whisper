const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ message: "Username already exists", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ message: "Email already exists", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;
    return res.json({ status: true, user });
  } 
  catch (err) {
    console.log(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });

    delete user.password;

    return res.json({ status: true, user });

  } 
  catch (err) {
    console.log(err);
  }
};

module.exports = { signup, login };
