const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('req.session.logged_in:', + req.session.logged_in);
  res.render('login');
})

module.exports = router;