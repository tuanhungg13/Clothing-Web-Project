const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    views: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: "https://png.pngtree.com/thumb_back/fh260/background/20230412/pngtree-business-keyboard-coffee-creative-background-image_2340199.jpg"
    },
    author: {
        type: String,
        default: "Admin"
    },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);