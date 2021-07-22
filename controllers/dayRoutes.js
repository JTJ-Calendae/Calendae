const router = require('express').Router();
const { User, Event, Rsvp } = require('../models');

//  get expanded event view (/:id)
router.get('/:id', async (req, res) => {
    // make a promise with try/catch
    // const id = req.params.id;
    try {
      const eventsData = await Event.findOne({
          where: {
              id: req.params.id
          },
        attributes: ['id', 'name', 'date', 'time', 'user_id', 
        'streetnumber', 'streetname', 'unitapt', 'city', 'state', 
        'zipcode', 'description'],
        include: [{
            model: User, 
            attributes: ['id', 'username']
        },
      {
          model: Rsvp,
          attributes: ['user_response'],
          include: [{
              model: User,
              attributes: ['firstname', 'lastname']
          }]
      }]
      })
      const event = eventsData.get({plain: true});
      req.session.save(() => {
        res.render('dayview', {
          event,
          logged_in: req.session.logged_in
        });
      })
      } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

router.post('/', 
// auth, 
async (req, res) => {
  try {
    const createEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(createEvent);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;