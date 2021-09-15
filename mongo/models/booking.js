const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    user_id: {
        type: String,
        required: true
    },
    restaurant_id: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    table_id: {
        type: String,
        required: true
    },
    day : {
        type: String,
        required: true
    },
    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Booking', bookingSchema);