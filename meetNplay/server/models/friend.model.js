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
module.exports = {
  create,
  find,
};
