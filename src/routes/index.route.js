
const userRoute = require("./user.route");

function route(app) {

  app.use('/user', userRoute);
}

module.exports = route;