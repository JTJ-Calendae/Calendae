const router = require('express').Router();
const { User, Event, Rsvp } = require('../../models');

// "Add event" in the Day view
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

//  get expanded event view (/:id)
router.get('/:id', async (req, res) => {
    // make a promise with try/catch
    // const id = req.params.id;
    try {
      const eventsData = await Event.findOne({
          where: {
              id: req.params.id
          },
        attributes: ['id', 'user_id', 'name', 'date', 'time', 'user_id', 
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
      res.status(200).json(eventsData);
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Will need a get day view


// will need a delete and update
// will need to factor in RSVP to this route


module.exports = router;