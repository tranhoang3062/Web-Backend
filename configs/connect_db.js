require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB
});

connection.connect((err) => {
  if(err) console.log('Connect database unsuccessful!'); 
  else console.log('Connect database successfully!');
});

module.exports = connection;