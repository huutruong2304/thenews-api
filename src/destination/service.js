const { Destination } = require('./model');
const {
    createCategory,
    deleteCategoryOfDestination,
    deleteAllCategories
} = require('../category/index');

const {
    belongsToClassify,
    getAllClassifyCategories
} = require('../classify-category/index')
const { removeDiacritics } = require('../utils/removeDiacritics')
const { crawlCategory } = require('../utils/crawler/crawl-category');

//GET
const getAllDestinations = async() => {
    return await Destination.find();
}

//POST
const crawlAndClassifyDestinations = async() => {
    try {
        const destinations = await getAllDestinations();
        const classifyCategories = await getAllClassifyCategories();
        return await Promise.all(
            destinations.map(async des => {
                const categories = await crawlCategory(des.url, des.categoryKit);
                return await Promise.all(
                    categories.map(async cate => {
                        let keyword = removeDiacritics(cate.title).split(' ').join('').toLowerCase();
                        let classifyCategory = belongsToClassify(keyword, classifyCategories);
                        if (classifyCategory) {
                            return await ({
                                classifyCategory,
                                destination: des._id,
                                title: cate.title,
                                url: cate.url
                            })
                        }
                        return {
                            title: cate.title,
                            msg: 'Not found available Classify-Category'
                        };
                    })
                )
            })
        )
    } catch (error) {
        console.log(error);
    }

}


const crawlAndClassifyOneDestination = async(id, url, categoryKit) => {
    try {
        const classifyCategories = await getAllClassifyCategories();
        const categories = await crawlCategory(url, categoryKit);
        return await Promise.all(
            categories.map(async cate => {
                let keyword = removeDiacritics(cate.title).split(' ').join('').toLowerCase();
                let classifyCategory = belongsToClassify(keyword, classifyCategories);
                // console.log(classifyCategory)
                if (classifyCategory) {
                    return await createCategory({
                        classifyCategory,
                        destination: id,
                        title: cate.title,
                        url: cate.url
                    })
                }
                return {
                    title: cate.title,
                    msg: 'Not found available Classify-Category'
                };
            })
        )
    } catch (error) {
        console.log(error)
    }

}

const createDestination = async(body) => {
    try {
        const des = await new Destination({
            ...body
        });
        await des.save();
        const categories = await crawlAndClassifyOneDestination(des._id, des.url, des.categoryKit);
        return {
            des,
            categories
        };
    } catch (error) {
        console.log(error);
    }
}

//PATCH
const updateDestination = async(id, updates) => {
    const updateKeys = Object.keys(updates);
    const allowedUpdates = ['name', 'url', 'categoryKit', 'articleKit'];
    const isValidOperation = updateKeys.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid update');
    }

    const des = await Destination.findOne({ _id: id });

    if (!des) {
        throw new Error('Invalid Destination');
    }

    updateKeys.forEach(update => {
        des[update] = updates[update];
    })

    await des.save();

    return des;
}


//DELETE
const deleteAllDestinations = async() => {
    return await Destination.deleteMany();
}

const deleteOneDestination = async(id) => {
    const des = await Destination.findOneAndDelete({ _id: id });
    const categories = await deleteCategoryOfDestination(des._id);
    return {
        des,
        categories
    };
}

module.exports = {
    getAllDestinations,
    createDestination,
    crawlAndClassifyDestinations,
    updateDestination,
    deleteOneDestination,
    deleteAllDestinations,
}