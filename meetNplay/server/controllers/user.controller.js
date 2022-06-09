const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const secret = "qlalfdldkslqslek";

const createUser = async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const user = {
    ...req.body,
    password: encryptedPassword,
  };
  User.create(req.pool, user, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ err });
    } else {
      const userToken = jwt.sign(
        {
          id: req.body.id,
        },
        process.env.SECRET_KEY
      );
      res
        .status(200)
        .cookie("usertoken", userToken, secret, {
          httpOnly: true,
        })
        .json(req.body);
    }
  });
};
const getUsers = (req, res) => {
  User.find(req.pool, function (err, results, fields) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(results);
    }
  });
};
const getUser = (req, res) => {
  console.log("hey");
  User.findOne(req.pool, req.params.id, function (err, results, fields) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(results);
    }
  });
};
const searchUser = (req, res) => {
  console.log("getUserByEmail");
  const email = req.body.email;
  User.findByEmail(req.pool, email, function (err, results, fields) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(results);
    }
  });
};
const updateUser = (req, res) => {
  User.update(
    req.pool,
    req.body,
    req.params.id,
    function (err, results, fields) {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(results);
      }
    }
  );
};
const deleteUser = (req, res) => {
  User.remove(req.pool, req.params.id, function (err, results, fields) {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json(results);
    }
  });
};
const login = async (req, res) => {
  const email = req.body.email;
  const results = await User.login(req.pool, req.body);
  if (results.length == 0) {
    res.status(401).json({ err: "user not found" });
  }
  const user = results[0];
  console.log(user);
  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!correctPassword) {
    res.status(401).json({ err: "user not found" });
  }
  const userToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY
  );
  res
    .cookie("usertoken", userToken, secret, {
      httpOnly: true,
    })
    .json({ msg: "login success!" });
};
module.exports = {
  createUser,
  getUsers,
  getUser,
  searchUser,
  updateUser,
  deleteUser,
  login,
};
