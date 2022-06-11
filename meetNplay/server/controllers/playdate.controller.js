const Playdate = require("../models/playdate.model");
const createPlaydate = async (req, res) => {
  const decodeJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const data = { ...req.body, user_id: decodeJwt.payload.id };
  console.log(data);
  try {
    const result = Playdate.create(req.pool);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "database err" });
  }
};
module.exports = {
  createPlaydate,
};
