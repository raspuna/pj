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
    const result = Playdate.create(data);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
  }
};
module.exports = {
  createPlaydate,
};
