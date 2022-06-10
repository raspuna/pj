const runQuery = (pool, sql, data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      } else {
        conn.query(sql, data, (err, result) => {
          conn.release();
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};
module.exports = {
  runQuery,
};
