const router = require('express').Router();
const { User, Event } = require('../models');
const auth = require('../utils/auth');
const emptydays = [{day: 'Monday'}, {day: 'Tuesday'}, {day: 'Wednesday'}, {day: 'Thursday'}, {day: 'Friday'}, {day: 'Saturday'}, {day: 'Sunday'}]

router.get('/', async (req, res) => {
  // make a promise with try/catch
  console.log('req.session.logged_in:', + req.session.logged_in);
  if (!(req.session.logged_in)) {
    res.redirect('/');
  } else {
    try {
      const eventsData = await Event.findAll({
        attributes: ['name', 'date', 'time', 'user_id']
      })
      // map sequelize data into plain json
      const events = eventsData.map( (event) =>  event.get({ plain: true }));
      req.session.save(() => {
        res.render('weekview', {
          events,
          emptydays,
          logged_in: req.session.logged_in
        });
      });
    }

    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
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