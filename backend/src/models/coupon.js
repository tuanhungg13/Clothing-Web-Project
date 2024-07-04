const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        upperCase: true
    },
    discount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
    },
    expiry: {
        type: Date,
        required: true,
    },
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);