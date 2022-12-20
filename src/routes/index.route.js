const userRoute = require("./user.route");
const loginRoute = require("./login.route");
const dayoffRoute = require("./dayoff.route");
const groupRoute = require("./group.route");
const notifiesRoute = require("./notifies.route");
const requestsRoute = require("./requests.route");
const historyRoute = require("./history.route");

function route(app) {
  app.use("/user", userRoute);
  app.use("/login", loginRoute);
  app.use("/dayoff", dayoffRoute);
  app.use("/group", groupRoute);
  app.use("/notifies", notifiesRoute);
  app.use("/requests", requestsRoute);
  app.use("/history", historyRoute);
}

module.exports = route;
