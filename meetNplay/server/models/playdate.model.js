const { query } = require("../config/mysql");
const validatePlaydate = (playdate) => {
  if (!playdate.title) {
    return [false, { title: "title", msg: "Title is missing" }];
  }
  if (!playdate.place) {
    return [
      false,
      { place: "place", msg: "Place is missing(please use search box!)" },
    ];
  }
  if (playdate.startTime >= playdate.endTime) {
    return [
      false,
      { time: "time", msg: "end time is earlier than start time" },
    ];
  }
  return [true, null];
};
const create = async (data) => {
  console.log("playdate create");
  sql = "INSERT INTO playdates SET ?";
  return await query(sql, data);
};
const find = (data) => {
  console.log("find playdates");
  sql = "SELECT * FROM playdates WHERE host_id =? ORDER BY start_time";
  return query(sql, data);
};
const findInvited = (data) => {
  console.log("find invited playdates");
  sql = `SELECT p.*, u.name, rsvp_status FROM playdates p
  JOIN users u ON u.id=p.host_id 
  JOIN rsvps r ON p.id = r.playdate_id WHERE r.user_id=? ORDER BY start_time`;
  return query(sql, data);
};
const findRsvps = (data) => {
  console.log("find rsvps");
  sql = `SELECT u.id, u.name, u.email, r.rsvp_status FROM users u 
  JOIN rsvps r ON r.user_id = u.id 
  JOIN playdates p ON p.id=r.playdate_id WHERE p.id = ? AND r.user_id != ?`;
  return query(sql, data);
};
const findOne = (data) => {
  console.log("findOne playdate");
  sql =
    "SELECT p.*, u.name FROM playdates p JOIN users u ON u.id = p.host_id WHERE p.id  =? ";
  return query(sql, data);
};
const update = (data, id) => {
  console.log("update");
  sql = "UPDATE playdates SET ? WHERE id =?";
  return query(sql, [data, id]);
};
const remove = (id) => {
  console.log("delete");
  sql = "DELETE FROM playdates WHERE id =?";
  return query(sql, id);
};
module.exports = {
  create,
  find,
  findInvited,
  findRsvps,
  findOne,
  update,
  remove,
  validatePlaydate,
};
