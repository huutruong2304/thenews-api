const { Category } = require('./model');

//GET
const getCategories = async(data) => {
    const {
        dest,
        limit,
        sort
    } = data;
    // const categories = await Category.find().sort({ destination: 0 }).limit(parseInt(queries.limit) || 10);
    let categories = await Category
        .find()
        .limit(parseInt(limit) || 10);

    // console.log(destination)

    if (dest) {
        categories = categories.filter(cate => cate.destination.toString() === dest);
    }

    return categories;
}

//POST
const createCategory = async(data) => {
    const category = await new Category({
        ...data
    });
    // console.log(category);
    await category.save();
    return category;
}

//PATCH

//DELETE
const deleteAllCategories = async() => {
    return await Category.deleteMany();
}

const deleteCategoryOfDestination = async(id) => {
    return await Category.deleteMany({ destination: id })
}

module.exports = {
    getCategories,
    createCategory,
    deleteAllCategories,
    deleteCategoryOfDestination
}



// const getAllCategoriesRAW = async() => {
//     const destinations = await Destination.find();
//     return await Promise.all(
//         destinations.map(async des => {
//             return await crawlCategory(des.url, des.categoryKit);
//         })
//     )
// }