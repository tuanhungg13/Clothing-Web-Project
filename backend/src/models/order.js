const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        color: String,
        size: String,
        quantity: Number,
        price: Number,
    }],
    initialTotalPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Đang xử lí",
        enum: ["Hủy", "Đang xử lí", "Đang chuẩn bị hàng", "Đang giao hàng", "Đã nhận hàng", "Đã đánh giá"],
    },
    note: {
        type: String,
    },
    payment: {
        type: String,
        default: "Thanh toán khi nhận hàng"
    },
    orderBy: {
        user: { type: mongoose.Types.ObjectId, ref: "User", required: false },
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        userName: String
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);