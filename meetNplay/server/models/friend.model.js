const create = (pool, data) => {
  return new Promise((resolve, reject) => {
    console.log("friendship create");
    sql = "INSERT INTO friendships SET ? ";
    pool.getConnection(function (err, connection) {
      connection.query(sql, data, (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};
const find = (pool, data) => {
  return new Promise((resolve, reject) => {
    console.log("friendship select ");
    sql =
      "SELECT u.* FROM friendships JOIN users u ON friend_id=u.id WHERE user_id=?";
    pool.getConnection(function (err, connection) {
      connection.query(sql, data, (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};
module.exports = {
  create,
  find,
};
