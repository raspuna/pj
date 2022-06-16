const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const register = async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const user = {
    ...req.body,
    password: encryptedPassword,
  };
  try {
    const result = await User.create(user);
    const userToken = jwt.sign(
      {
        id: result.insertId,
      },
      process.env.SECRET_KEY
    );
    res
      .status(200)
      .cookie("usertoken", userToken, {
        httpOnly: true,
      })
      .json(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
const getUsers = (req, res) => {
  User.find(function (err, results, fields) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(results);
    }
  });
};
//todo fix
const getUser = (req, res) => {
  console.log("hey");
  User.findOne(req.params.id, function (err, results, fields) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(results);
    }
  });
};
const searchUser = async (req, res) => {
  console.log("getUserByEmail");
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  try {
    const results = await User.findOne({ email: req.body.email });
    if (results.length == 0) {
      res.status(400).json({ err: "The email is not a signed user" });
      return;
    } else if (results[0].id === decodeJwt.payload.id) {
      res
        .status(400)
        .json({ err: "It is impossible to add yourself to a friend" });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    console.log("in searchUser", err);
    res.status(500).json({ err });
  }
};
const updateUser = (req, res) => {
  User.update(req.body, req.params.id, function (err, results, fields) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(results);
    }
  });
};
const deleteUser = (req, res) => {
  User.remove(req.params.id, function (err, results, fields) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(results);
    }
  });
};
const login = async (req, res) => {
  const email = req.body.email;
  try {
    const results = await User.findOne({ email: email });

    console.log(results);
    if (results.length == 0) {
      res.status(401).json({ err: "user not found" });
      return;
    }
    const user = results[0];
    console.log(user);
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      res.status(401).json({ err: "user not found" });
      return;
    }
    const userToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY
    );
    res
      .cookie("usertoken", userToken, {
        httpOnly: true,
      })
      .json({ msg: "login success!" });
  } catch (err) {
    console.log(err);
  }
};
const logout = (req, res) => {
  console.log("user logout");
  res.clearCookie("usertoken");
  res.status(200).json({ msg: "logout" });
};
const getLoggedInUser = async (req, res) => {
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  try {
    const results = await User.findOne({ id: decodeJwt.payload.id });
    if (results.length == 0) {
      res.status(401).json({ err: "invalid access" });
    } else {
      res.status(200).json(results);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "get logged in user " });
  }
};
module.exports = {
  register,
  getUsers,
  getUser,
  searchUser,
  updateUser,
  deleteUser,
  login,
  logout,
  getLoggedInUser,
};
