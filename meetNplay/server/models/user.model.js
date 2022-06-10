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

const create = (pool, data, callback) => {
  console.log("create");
  const errArray = [];
  ///if (!validateUser(data, errArray)) {
  //  throw errArray[0];
  //}
  sql = "INSERT INTO users SET ?";
  pool.getConnection(function (err, connection) {
    connection.query(sql, data, callback);
    connection.release();
  });
};

const find = (pool, callback) => {
  console.log("select *");
  sql = "SELECT * FROM users";
  pool.getConnection(function (err, connection) {
    connection.query(sql, callback);
    connection.release();
  });
};
const findOne = (pool, data) => {
  return new Promise((resolve, reject) => {
    console.log("findOne");
    console.log(data);
    sql = "SELECT * FROM users WHERE ?";
    pool.getConnection(function (err, connection) {
      connection.query(sql, data, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
};
const findByEmail = (pool, email, callback) => {
  console.log("select by email");
  sql = "SELECT * FROM users where email=?";
  pool.getConnection(function (err, connection) {
    connection.query(sql, email, callback);
    connection.release();
  });
};
const update = (pool, data, id, callback) => {
  console.log(`update id=${id}`);
  sql = "UPDATE users SET ? WHERE id=?";
  pool.getConnection(function (err, connection) {
    connection.query(sql, [data, id], callback);
    connection.release();
  });
};
const remove = (pool, id, callback) => {
  console.log(`delete id=${id}`);
  sql = "DELETE FROM users WHERE id=?";
  pool.getConnection(function (err, connection) {
    connection.query(sql, id, callback);
    connection.release();
  });
};
module.exports = {
  create,
  find,
  findOne,
  findByEmail,
  update,
  remove,
};
