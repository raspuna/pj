const { query } = require("../config/mysql");
const create = async (data) => {
  console.log("playdate create");
  sql = "INSERT INTO playdates SET ?";
  return await query(sql, data);
};
module.exports = { create };
