const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    restaurant_id: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Table', tableSchema);