const router = require('express').Router();

// this is to require the api file
const apiRoutes = require('./api');

// this is to require the homeroutes file
const landingRoutes = require('./landingRoutes');
const homeRoutes = require('./homeRoutes');

// this is directing the URL to the filepath or for the REST services (GET or POST routes)
router.use('/', landingRoutes);
router.use('/weekview', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;