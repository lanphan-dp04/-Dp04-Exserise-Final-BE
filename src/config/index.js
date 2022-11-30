const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'dp04',
});
 


const connect = connection.connect((err) => {
    if (err) {
        console.log('Not connected to database');
        throw err;
    } else {
        console.log('Connected to database');
    }
});

module.exports = {connect};