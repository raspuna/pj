require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "meetnplay",
});
const query = (sql, data) => {
  console.log(sql, data);
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
  query,
};
