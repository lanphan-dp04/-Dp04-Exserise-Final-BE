module.exports = {
  checkAuth: function(req, res, next) {
    if (!req.localStorage.token) {
      res.redirect('/login');
    } else {
      next();
    }
  },
  isAuth: function(req, res, next) {
    if (req.cookies.access_token) {
      res.redirect('/');
    } else {
      next();
    }
  }
}