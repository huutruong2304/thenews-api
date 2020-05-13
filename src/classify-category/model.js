const mongoose = require('mongoose');
const { convertToSlug } = require('../utils/removeDiacritics')

const schema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        trim: true
    },
    tags: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

schema.virtual('categories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'classifyCategory'
})

// function setSlug() {
//     return convertToSlug(this.title);
// }
// schema.virtual('slug').get(function() {
//     return convertToSlug(this.title);
// })

schema.pre('save', function(next) {
    const classCate = this;

    if (classCate.isModified('title')) {
        classCate.slug = convertToSlug(classCate.title);
    }

    next();
})


const ClassifyCategory = mongoose.model('ClassifyCategory', schema);

module.exports = {
    ClassifyCategory
}