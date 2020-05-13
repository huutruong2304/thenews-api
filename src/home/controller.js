const { getNow } = require('./service')

const homeController = (app) => {
    app.route('/')
        .get(async(req, res) => {
            try {
                res.send({
                    message: "Welcome to NEWs API",
                    describe: "API crawl tin tức từ các trang báo mạng theo chủ đề như: thời sự, thế giới, thể thao,...",
                    author: "Nguyễn Hữu Trường",
                    date: getNow(),
                    version: '',
                });
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
    app.route('/**')
        .get((req, res) => {
            res.redirect('/');
        })
}


module.exports = { homeController };