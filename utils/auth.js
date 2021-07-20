const auth = (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('login');
  }
};

module.exports = auth;