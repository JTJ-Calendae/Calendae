const {Model, DataTypes }  = require('sequelize');
const sequelize = require('../config/connection');

class Rsvp extends Model {}

Rsvp.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },     
        user_response: {
            type: DataTypes.STRING,
            allowNull: false,
            },
    },   
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'rsvp',
    }
);  

module.exports = Rsvp;  