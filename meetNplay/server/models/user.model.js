const { query } = require("../config/mysql");
const validateUser = (userData, confirmed) => {
  if (!userData.name) {
    return [false, { name: "name", msg: "User name is missing" }];
  }
  if (userData.name.length < 3) {
    return [false, { name: "name", msg: "User name is too short" }];
  }
  if (!userData.email) {
    return [false, { email: "email", msg: "Email is missing" }];
  }
  if (!/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(userData.email)) {
    return [false, { email: "email", msg: "Invalid email" }];
  }
  if (!userData.password) {
    return [false, { password: "password", msg: "Password is missing" }];
  }
  if (userData.password.length < 3) {
    return [false, { password: "password", msg: "Password is too short" }];
  }
  if (!confirmed) {
    return [
      false,
      { confirmed: "confirmed", msg: "Confirm Password is missing" },
    ];
  }
  if (userData.password !== confirmed) {
    return [false, { confirmed: "confirmed", msg: "Password doesn't match" }];
  }
  return [true, 0, ""];
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
const findOneNotFriend = async (data) => {
  // [email, myid]
  sql = `SELECT f.user_id, u.* FROM friendships f 
  RIGHT JOIN (select * FROM users WHERE email=?) u 
  ON f.friend_id=u.id AND user_id=?;`;
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
  validateUser,
  create,
  find,
  findOne,
  findOneNotFriend,
  update,
  remove,
};
