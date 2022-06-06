require('dotenv').config();
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB,
    database: 'meetnplay'
});
const create = (data) => {
    console.log("create");
    sql = "INSERT INTO friendship SET ?"
    conn.query(sql, data,function(err){
        if (err) throw err;
        console.log(results.insertId);
    })
};