const router = require('express').Router();
const { User, Event } = require('../models');
// const auth = require('../utils/auth');

router.get('/', async (req, res) => {
  // make a promise with try/catch
  try {
    const eventsData = await Event.findAll({
      attributes: ['name', 'date', 'time', 'user_id']
    })
    // map sequelize data into plain json
    const events = eventsData.map(async (event) => await event.get({ plain: true }));
    req.session.save(() => {
      res.render('login', {
        events,
        loggedIn: req.session.loggedIn
      });
    })
    // res.status(200).json(eventsData);
    // return;
  }

  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const createEvent = await Event.create(req.body);
    res.status(200).json(createEvent);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;