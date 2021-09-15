const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    owener_id: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    working_hrs: {
        'sunday': {
            start: Number,
            end: Number
        },
        'monday': {
            start: Number,
            end: Number
        },
        'tuesday': {
            start: Number,
            end: Number
        },
        'wednesday': {
            start: Number,
            end: Number
        },
        'thursday': {
            start: Number,
            end: Number
        },
        'friday': {
            start: Number,
            end: Number
        },
        'saturday': {
            start: Number,
            end: Number
        },
    },

})

module.exports = mongoose.model('Restaurant', restaurantSchema);