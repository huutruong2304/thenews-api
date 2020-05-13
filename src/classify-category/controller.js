const {
    getAllClassifyCategories,
    createClassifyCategory,
    updateClassifyCategory,
    deleteAllClassifyCategories,
    getAllSlug
} = require('./service')

const classifyCategoryController = (app) => {
    app.route('/classify-category')
        .get(async(req, res) => {
            try {
                const result = await getAllClassifyCategories();
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .post(async(req, res) => {
            try {
                const result = await createClassifyCategory(req.body);
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .patch(async(req, res) => {
            try {
                res.send();
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .delete(async(req, res) => {
            try {
                const result = await deleteAllClassifyCategories();
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
    app.route('/classify-category/:id')
        .patch(async(req, res) => {
            try {
                const result = await updateClassifyCategory(req.params.id, req.body)
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
    app.route('/classify-category/slug')
        .get(async(req, res) => {
            try {
                const result = await getAllSlug();
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
}


module.exports = { classifyCategoryController };