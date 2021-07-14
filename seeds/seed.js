const sequelize = require('../config/connection');
// we do not need RSVP table here because we are not seeding that table
const { User, Event } = require('../models');
// const User = require('../models/User');
// const Event = require('../models/Event');

const userData = require('./userData.json');
const eventData = require('./eventData.json')

const seedDatabase = async () => {
    await sequelize.sync({force: true});
    console.log("users1", User);
    console.log("users2", userData);
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const event of eventData) {
        await Event.create({
            ...event,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();