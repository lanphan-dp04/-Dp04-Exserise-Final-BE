
const userRoute = require("./user.route");
const loginRoute = require("./login.route");

function route(app) {

  app.use('/user', userRoute);
  app.use('/login', loginRoute);
}

module.exports = route;

