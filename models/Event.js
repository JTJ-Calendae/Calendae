const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        streetNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            },
        streetName: {
            type: DataTypes.STRING,
            allowNull: true,
            },        
        unitApt: {
            type: DataTypes.STRING,
            allowNull: true,
            },    
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            },        
        state: {
            type: DataTypes.STRING,
            allowNull: true,
            },     
        zipCode: {
            type: DataTypes.STRING,
            allowNull: true,
            },                                                                    
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'event',
    }
);

module.exports = Event;