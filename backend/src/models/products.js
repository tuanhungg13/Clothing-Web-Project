const mongoose = require('mongoose'); // Erase if already required

//createFE(.....)
//apicretea
//



// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: Array,
        required: true,
    },
    brand: {
        type: String,
        default: "Atino"
    },
    options: [
        {
            color: { type: String, require: true },
            sizeQuantity: [{
                size: { type: String, require: true },
                quantity: { type: Number, require: true }
            }],
            images: Array
        }
    ],
    discount: {
        type: Number,
        default: 0
    },
    expiryDiscount: {
        type: Date
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "ProductCategory"
    },
    sold: {
        type: Number,
        default: 0
    },
    ratings: [
        {
            star: { type: Number },
            postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
            comment: { type: String }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);