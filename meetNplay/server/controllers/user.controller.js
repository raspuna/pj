const User = require("../models/user.models");
const createUser = (req, res) => {
  User.create(req.pool, req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ err });
    } else {
      res.status(200).json(req.body);
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
module.exports = {
  createUser,
  getUsers,
  getUser,
  searchUser,
  updateUser,
  deleteUser,
};
