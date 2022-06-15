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
const updatePlaydate = async (req, res) => {
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  try {
    const result = await Playdate.findOne(req.params.id);
    const playdate = result[0];
    console.log(playdate);
    console.log("hostid:", playdate.host_id, " cookieid", decodeJwt.payload.id);
    if (playdate.host_id != decodeJwt.payload.id) {
      res.status(403).json({ err: "unauthorized" });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
    return;
  }

  const start = new Date(Date.parse(req.body.startTime));
  const end = new Date(Date.parse(req.body.endTime));
  const data = {
    title: req.body.title,
    place: req.body.place,
    start_time: start,
    end_time: end,
  };
  try {
    const result = await Playdate.update(data, req.params.id);

    console.log(result);
    res.status(200).json(result[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
  }
};
const deletePlaydate = async (req, res) => {
  console.log("delete ");
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  try {
    const result = await Playdate.findOne(req.params.id);
    const playdate = result[0];
    console.log(playdate);
    console.log("hostid:", playdate.host_id, " cookieid", decodeJwt.payload.id);
    if (playdate.host_id != decodeJwt.payload.id) {
      res.status(403).json({ err: "unauthorized" });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
    return;
  }
  try {
    const result = await Playdate.remove(req.params.id);
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
  updatePlaydate,
  deletePlaydate,
};
