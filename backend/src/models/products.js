const mongoose = require('mongoose'); // Erase if already required

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
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0
    },

    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
    },
    color: {
        type: Array,
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