const router = require('express').Router();
const { User } = require('../../models');

// register post route
router.post('/', async (req, res) => {
    try {
// insert user info into db
        const userData = await User.create(req.body);
// insert user info into cookies
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.email = userData.email;

        req.session.logged_in = true;
    
        res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
    });

// get all users route
router.get('/', async(req,res) => {
    try {
        const getAllUsers = await User.findAll({
            attributes: { exclude: ["password"]}
        })
        res.status(200).json(getAllUsers)

    } catch (err) {
            res.status(400).json(err);
        }
});


// login & logut routes

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
  
      if (!userData) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.email = userData.email;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;