
const userRoute = require("./user.route");
const loginRoute = require("./login.route");
const dayoffRoute = require("./dayoff.route");
const groupRoute = require("./group.route");
const notifiesRoute = require("./notifies.route");

function route(app) {

  app.use('/user', userRoute);
  app.use('/login', loginRoute);
  app.use('/dayoff', dayoffRoute);
  app.use('/notifies', notifiesRoute);
}

module.exports = route;

