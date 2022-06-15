const { query } = require("../config/mysql");

const create = async (data) => {
  console.log("friendship create");
  sql = "INSERT INTO friendships SET ? ";
  return await query(sql, data);
};
const find = async (data) => {
  console.log("friendship select ");
  sql =
    "SELECT u.* FROM friendships JOIN users u ON friend_id=u.id WHERE user_id=?";
  return await query(sql, data);
};
const findInvited = (data) => {
  console.log("test");
  sql = `SELECT friend_id as id, u.name, u.email, r.rsvp_status FROM friendships f 
    JOIN users u ON friend_id = id 
 LEFT JOIN rsvps r ON r.user_id=friend_id AND r.playdate_id = ? WHERE f.user_id = ?`;
  return query(sql, data);
};
module.exports = {
  create,
  find,
  findInvited,
};
