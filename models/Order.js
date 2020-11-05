const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;