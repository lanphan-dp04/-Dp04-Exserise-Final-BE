const express = require('express');
const morgan = require('morgan');
const db = require("./config/index");
const cookieParser = require("cookie-parser");
let cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override")

//connect db
db.connect();

const app = express();

const route = require("./routes/index.route")

app.use(cookieParser());

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use(morgan('combined'));

app.get('/', (req,res) => res.send('Hello World'));

// route innit
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});