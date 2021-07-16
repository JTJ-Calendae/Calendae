const Event = require('./Event');
const User = require('./User');
const Rsvp = require('./RSVP');

User.hasMany(Event, {
    foreignKey: 'user_id',
});

Event.hasMany(Rsvp, {
    foreignKey: 'event_id',
});


User.hasMany(Rsvp, {
    foreignKey: 'user_id',
});

Event.hasMany(Rsvp, {
    foreignKey: 'event_id',
});

Event.belongsTo(User)

Rsvp.belongsTo(Event);

Rsvp.belongsTo(User);


module.exports = { User, Event, Rsvp};