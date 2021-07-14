const Event = require('./Event');
const User = require('./User');
const Rsvp = require('./RSVP');

User.hasMany(Event, {
    foreignKey: 'user_id',
});

Event.hasMany(Rsvp, {
    foreignKey: 'event_id',
});

Rsvp.belongsTo(Event, {
    foreignKey: 'event_id',
});

Rsvp.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Rsvp, {
    foreignKey: 'user_id',
});

Event.hasMany(Rsvp, {
    foreignKey: 'event_id',
});

module.exports = { User, Event};