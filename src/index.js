const express = require('express');
const morgan = require('morgan');
const db = require('./config/index')

// make connection db
db.connect

const app = express();
const port = 3000;
const route = require("./routes/index.route")

app.use(morgan('combined'));

app.get('/', (req,res) => res.send('Hello World'));

// route innit
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});