const {
    getOneUser,
    getAllUsers,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    deleteAllUsers
} = require('./service')

const userController = (app) => {
    app.route('/user')
        .get(async(req, res) => {
            try {
                const result = await getAllUsers();
                res.status(200).send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .post(async(req, res) => {
            try {
                const result = await createOneUser(req.body);
                res.status(201).send(result);
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
    app.route('/user/:id')
        .get(async(req, res) => {
            try {
                const result = await getOneUser(req.params.id);
                res.status(200).send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .post(async(req, res) => {
            try {
                const result = await createOneUser(req.body);
                res.status(201).send(result);
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
}


module.exports = {
    userController
}