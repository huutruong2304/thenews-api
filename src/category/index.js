const { categoryController } = require('./controller')
const { Category } = require('./model')
const { createCategory, deleteCategoryOfDestination, deleteAllCategories } = require('./service')

module.exports = {
    categoryController,
    Category,
    createCategory,
    deleteCategoryOfDestination,
    deleteAllCategories
}