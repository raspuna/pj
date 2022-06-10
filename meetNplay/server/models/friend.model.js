const { runQuery } = require("./lib.js");

const create = async (pool, data) => {
  console.log("friendship create");
  sql = "INSERT INTO friendships SET ? ";
  return await runQuery(pool, sql, data);
};
const find = async (pool, data) => {
  console.log("friendship select ");
  sql =
    "SELECT u.* FROM friendships JOIN users u ON friend_id=u.id WHERE user_id=?";
  return await runQuery(pool, sql, data);
};
module.exports = {
  create,
  find,
};
