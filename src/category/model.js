const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Destination'
    },
    classifyCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ClassifyCategory'
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', schema);

module.exports = {
    Category
}