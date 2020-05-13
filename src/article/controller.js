const {
    getArticlesFromWeb,
    getArticlesByCC
} = require('./service')

const articleController = (app) => {
    app.route('/articles')
        .get(async(req, res) => {
            try {
                res.status(200).json({
                    message: "get article from destination by classify-category, for example: http://localhost:3000/article/the-gioi "
                });
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .post(async(req, res) => {
            try {
                res.send();
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
                res.send();
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
    app.route('/articles/:cc') //classifyCategory
        .get(async(req, res) => {
            try {
                const result = await getArticlesByCC(req.params.cc);
                res.status(200).send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
}

module.exports = { articleController }