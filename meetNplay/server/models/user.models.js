

const create = (pool, data, callback) => {
        console.log("create");
        sql = "INSERT INTO users SET ?"
        pool.getConnection(function(err, connection) {
            connection.query(sql, data, callback);
            connection.release();
        })
    };

const find = (pool, callback) => {
    console.log("select *");
    sql = "SELECT * FROM users"
    pool.getConnection(function(err, connection) {
        connection.query(sql, callback);
        connection.release();
    })
} 
const findOne = (pool, id, callback) => {
    console.log(`select id=${id}`);
    sql = "SELECT * FROM users where id=?"
    pool.getConnection(function(err, connection) {
        connection.query(sql, id, callback);
        connection.release();
    })
} 
const update = (pool, data, id, callback) => {
    console.log(`update id=${id}`);
    sql = "UPDATE users SET ? WHERE id=?"
    pool.getConnection(function(err, connection) {
        connection.query(sql, [data, id], callback);
        connection.release();
    }) 
}
const remove = (pool, id, callback) => {
    console.log(`delete id=${id}`);
    sql = "DELETE FROM users WHERE id=?";
    pool.getConnection(function(err, connection) {
        connection.query(sql, id, callback);
        connection.release();
    })  
}
module.exports = {
    create,
    find,
    findOne,
    update,
    remove
};