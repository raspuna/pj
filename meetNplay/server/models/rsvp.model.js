const { query } = require("../config/mysql");

const create = (data) => {
  console.log("rsvp create");
  sql = "INSERT INTO rsvps SET ?";
  return query(sql, data);
};
const creates = (data) => {
  console.log("rsvp create");
  sql = "INSERT INTO rsvps (playdate_id, user_id, rsvp_status) VALUES ?";
  return query(sql, [data]);
};
const findOne = (data) => {
  console.log("rsvp findOne");
  sql = "SELECT rsvp_status FROM rsvps WHERE playdate_id = ? AND user_id =?";
  return query(sql, data);
};
const update = (data) => {
  console.log("rsvp update");
  sql = "UPDATE rsvps SET rsvp_status=? WHERE playdate_id = ? AND user_id =?";
  return query(sql, data);
};
const remove = (id) => {
  console.log("remove");
  sql = "DELETE FROM rsvps WHERE id=?";
  return query(sql, id);
};
module.exports = { create, creates, update, remove, findOne };
