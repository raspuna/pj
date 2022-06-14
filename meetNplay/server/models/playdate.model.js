const { query } = require("../config/mysql");
const create = async (data) => {
  console.log("playdate create");
  sql = "INSERT INTO playdates SET ?";
  return await query(sql, data);
};
const find = (data) => {
  console.log("find playdates");
  sql = "SELECT * FROM playdates WHERE host_id =? ";
  return query(sql, data);
};
const findOne = (data) => {
  console.log("findOne playdate");
  sql = "SELECT * FROM playdates WHERE id =? ";
  return query(sql, data);
};
module.exports = { create, find, findOne };
