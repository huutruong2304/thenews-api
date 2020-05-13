const notFoundController = (app) => {
    app.route('/').get((req, res) => {
        res.send({
            message: "You"
        })
    })
}