const {
    getAllCategoriesRAW,
    crawlAndClassifyCategories,
    getCategories,
    deleteAllCategories
} = require('./service');

// 1 dường dẫn sẽ ít khi nào mà bao gồm cả 4 method.
// nên đặt tên đường dẫn đúng với chức năng của nó cung cấp
// vì nếu mà đặt tên route '/categories' xong cả 4 phương thức vào thì người ta sẽ ko hiểu dc chức năng của nó là gì
// for example: '/category/getAll' => chỉ có phương thức get => trả về toàn bộ category


const categoryController = (app) => {
    app.route('/categories')
        .get(async(req, res) => {
            try {
                const result = await getCategories(req.query);
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .post(async(req, res) => {
            try {
                const result = await crawlAndClassifyCategories();
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .delete(async(req, res) => {
            try {
                const result = await deleteAllCategories();
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        // app.route('/categories/raw')
        //     .get(async(req, res) => {
        //         try {
        //             const result = await getAllCategoriesRAW();
        //             res.send(result);
        //         } catch (error) {
        //              res.status(400).send({
        //     error: error.message
        // })
        //         }
        //     })
}


module.exports = { categoryController };