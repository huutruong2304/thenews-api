const mongoose = require('mongoose');
const { crawlAndClassifyOneCategory } = require('../category/index')
const validator = require('validator')


const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
            // validate(value){
            // } // viết những validation ở tại đây bla bla
    },
    url: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    categoryKit: {
        type: String,
        required: true,
        trim: true
    },
    articleKit: {
        type: String,
        // required: true,
        trim: true
    }
}, {
    timestamps: true
});

schema.virtual('categories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'destination'
})




const Destination = mongoose.model('Destination', schema);

module.exports = {
    Destination
}