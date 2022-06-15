const jwt = require("jsonwebtoken");
const Friend = require("../models/friend.model");

const createFriend = async (req, res) => {
  console.log("create friends");
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const data = { user_id: decodeJwt.payload.id, friend_id: req.body.friend_id };
  console.log(data);
  try {
    const result = await Friend.create(data);
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
  try {
    const results = await Friend.find(data);
    res.status(200).json(results);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
  }
};
const getFriendsInvited = async (req, res) => {
  console.log("select friends");
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const data = [req.params.playdateId, decodeJwt.payload.id];
  try {
    const results = await Friend.findInvited(data);
    res.status(200).json(results);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
  }
};
module.exports = {
  createFriend,
  getFriends,
  getFriendsInvited,
};
