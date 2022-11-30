// const mysql      = require('mysql');
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   port     : 3306,
//   user     : 'root',
//   password : 'root',
//   database : 'dp04',
// });
 
// const connect = connection.connect((err) => {
//     if (err) {
//         console.log('Not connected to database');
//         throw err;
//     } else {
//         console.log('Connected to database');
//     }
// });

// module.exports = {connect};




const mongoose = require("mongoose")

const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@pls-dp-04.srrnaky.mongodb.net/dp04');
    console.log('Connect successfuly!!!');
  }
  catch(error) {
    console.log('Connect failure!!!');
  }
}
module.exports = { connect }