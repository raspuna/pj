require('dotenv').config();
const mysql = require('mysql');

const express = require('express');
const cors = require('cors');
const pool = require('./config/mysql')
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(function(req, res, next) {
    req.pool = pool;
    next();
})
require('./routes/user.routes')(app);

app.listen(PORT, ()=>{ console.log(`Server is running on ${PORT}`)});