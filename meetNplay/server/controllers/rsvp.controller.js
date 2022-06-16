const jwt = require("jsonwebtoken");
const Playdate = require("../controllers/playdate.controller");
const RSVP = require("../models/rsvp.model");
const NO = 9;
const MAYBE = 2;
const YES = 1;
const NOT_YET = 0;

const createRSVP = async (req, res) => {
  if (!(await Playdate.authorizePlaydate(req.body.playdateId, req, res))) {
    return;
  }
  const playdateId = req.body.playdateId;
  const friends = req.body.friends;

  const data = [];
  for (let i = 0; i < friends.length; i++) {
    data[i] = [playdateId, Number(friends[i]), NOT_YET];
  }
  console.log(data);
  try {
    const result = await RSVP.creates(data);
    res.status(200).json(result);
  } catch (e) {
    console.log("in creates ", e);
    res.status(500).json({ err: "database err" });
  }
};

const replyRSVP = async (req, res) => {
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const id = decodeJwt.payload.id;
  console.log(req.body);
  const data = [req.body.rsvp, req.body.playdateId, id];
  try {
    const result = await RSVP.update(data);
    res.status(200).json(result);
  } catch (e) {
    console.log("in reply ", e);
    res.status(500).json({ err: "database err" });
  }
};
const getRSVP = async (req, res) => {
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const id = decodeJwt.payload.id;
  const data = [Number(req.params.playdateId), id];
  try {
    const result = await RSVP.findOne(data);
    res.status(200).json(result);
  } catch (e) {
    console.log("getRSVP ", e);
    res.status(500).json({ err: "database err" });
  }
};

module.exports = {
  createRSVP,
  replyRSVP,
  getRSVP,
};
