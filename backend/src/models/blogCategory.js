const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        index: true,
    }
});

//Export the model
module.exports = mongoose.model('BlogCategory', blogCategorySchema);