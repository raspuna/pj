const jwt = require("jsonwebtoken");
const Friend = require("../models/friend.model");

const createFriend = async (req, res) => {
  console.log("create friends");
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const data = { user_id: decodeJwt.payload.id, friend_id: req.body.friend_id };
  console.log(data);
  try {
    const result = await Friend.create(req.pool, data);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
  }
};
const getFriends = async (req, res) => {
  console.log("select friends");
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const data = decodeJwt.payload.id;
  const results = await Friend.find(req.pool, data);
  res.status(200).json(results);
};
module.exports = {
  createFriend,
  getFriends,
};
