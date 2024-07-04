const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var billSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        color: String,
        size: String,
        quantity: Number,

    }],
    status: {
        type: String,
        default: "Processing",
        enum: ["Cancelled", "Processing", "Successed"],
    },
    payment: {
        type: String,
        default: "Thanh toán khi nhận hàng"
    },
    orderBy: {
        type: mongoose.Types.ObjectId, ref: "User"
    },
});

//Export the model
module.exports = mongoose.model('Bill', billSchema);