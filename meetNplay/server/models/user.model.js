const { query } = require("../config/mysql");
const validateUser = (userData, errArray) => {
  if (!userData.name) {
    errArray.push("user name is missing");
    return false;
  }
  if (userData.name.length < 3) {
    errArray.push("user name is too short");
    return false;
  }
  if (!/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(userData.email)) {
    errArray.push("invalid email pattern");
    return false;
  }
  return true;
};

const create = async (data) => {
  console.log("create");
  sql = "INSERT INTO users SET ?";
  return await query(sql, data);
};

const find = async () => {
  console.log("select *");
  sql = "SELECT * FROM users";
  return await query(sql);
};
const findOne = async (data) => {
  sql = "SELECT * FROM users WHERE ?";
  return await query(sql, data);
};

const update = async (data, id) => {
  console.log(`update id=${id}`);
  sql = "UPDATE users SET ? WHERE id=?";
  return await query(sql, [data, id]);
};

const remove = async (id) => {
  console.log(`delete id=${id}`);
  sql = "DELETE FROM users WHERE id=?";
  return await query(sql, id);
};
module.exports = {
  create,
  find,
  findOne,
  update,
  remove,
};
