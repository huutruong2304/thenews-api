const {
    getAllDestinations,
    createDestination,
    crawlAndClassifyDestinations,
    updateDestination,
    deleteOneDestination,
    deleteAllDestinations
} = require('./service');

const destinationController = (app) => {
    app.route('/destinations')
        .get(async(req, res) => {
            try {
                const result = await getAllDestinations();
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .post(async(req, res) => {
            try {
                const result = await createDestination(req.body);
                res.send(result);
            } catch (error) {
                res.json({
                    status: 'error',
                    error
                })
            }
        })
        .put(async(req, res) => {
            try {
                const result = await crawlAndClassifyDestinations();
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .delete(async(req, res) => {
            try {
                const result = await deleteAllDestinations();
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
    app.route('/destinations/:id')
        .delete(async(req, res) => {
            try {
                const result = await deleteOneDestination(req.params.id);
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .patch(async(req, res) => {
            try {
                const result = await updateDestination(req.params.id, req.body)
                res.send(result);
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
}


module.exports = { destinationController };