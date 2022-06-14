const jwt = require("jsonwebtoken");
const Playdate = require("../models/playdate.model");
const createPlaydate = async (req, res) => {
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const start = new Date(req.body.startTime);
  const end = new Date(req.body.endTime);
  const data = {
    title: req.body.title,
    place: req.body.place,
    start_time: start,
    end_time: end,
    host_id: decodeJwt.payload.id,
  };
  try {
    const result = await Playdate.create(data);
    res.status(200).json(result);
  } catch (e) {
    console.log("in createPlaydate", e);
    res.status(500).json({ err: "database err" });
  }
};
const getPlaydates = async (req, res) => {
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const id = decodeJwt.payload.id;
  try {
    const results = await Playdate.find(id);
    console.log(results);
    res.status(200).json(results);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
  }
};
const getPlaydate = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Playdate.findOne(id);
    console.log(result);
    res.status(200).json(result[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
  }
};
module.exports = {
  createPlaydate,
  getPlaydates,
  getPlaydate,
};
