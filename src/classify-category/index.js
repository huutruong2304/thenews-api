const { classifyCategoryController } = require('./controller')
const { belongsToClassify, getAllClassifyCategories } = require('./service')
const { ClassifyCategory } = require('./model')

module.exports = {
    classifyCategoryController,
    getAllClassifyCategories,
    belongsToClassify,
    ClassifyCategory
}