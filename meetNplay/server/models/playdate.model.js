const { query } = require("../config/mysql");
const create = async (data) => {
  console.log("playdate create");
  sql = "INSERT INTO playdates SET ? , created_at=NOW()";
  return await query(sql, data);
};
module.exports = { create };
