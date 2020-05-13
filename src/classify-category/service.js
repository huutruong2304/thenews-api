const { ClassifyCategory } = require('./model')
    // const { Destination } = require('../destination/index')


//GET
const getClassifyCategory = async(slug) => {
    return await ClassifyCategory.findOne({ slug: slug })
}

const getAllClassifyCategories = async() => {
    const classifyCategories = await ClassifyCategory.find();
    return classifyCategories;
}

const getAllSlug = async() => {
    const slugs = [];
    const classifyCategories = await getAllClassifyCategories();

    classifyCategories.forEach(classCate => {
        slugs.push(classCate.slug);
    });

    return slugs;
}

//POST
const createClassifyCategory = async(data) => {
    const classifyCategory = await new ClassifyCategory({
        ...data
    });

    await classifyCategory.save();
    return classifyCategory;
}


//PATCH
const updateClassifyCategory = async(id, updates) => {
    const updateKeys = Object.keys(updates);
    const allowUpdates = ['title', 'tags'];
    const isValidOperation = updateKeys.every(update => allowUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid update');
    }

    const classCate = await ClassifyCategory.findOne({ _id: id })

    if (!classCate) {
        throw new Error('Invalid Destination');
    }

    updateKeys.forEach(update => {
        classCate[update] = updates[update];
    });

    await classCate.save();

    return classCate;
}


//DELETE
const deleteAllClassifyCategories = async() => {
    return await ClassifyCategory.deleteMany();
}



//UTILS
const belongsToClassify = (keyword, data) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].tags.includes(keyword)) {
            return data[i]._id;
        }
    }
    return null;
}

module.exports = {
    getAllClassifyCategories,
    createClassifyCategory,
    updateClassifyCategory,
    deleteAllClassifyCategories,
    getAllSlug,
    getClassifyCategory,
    belongsToClassify
}