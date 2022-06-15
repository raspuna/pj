const { query } = require("../config/mysql");
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
const findOne = (data) => {
  console.log("findOne playdate");
  sql = "SELECT * FROM playdates WHERE id =? ";
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
module.exports = { create, find, findOne, update, remove };
