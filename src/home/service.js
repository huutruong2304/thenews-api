const moment = require('moment');

const getNow = () => {
    const now = moment();
    return now;
}

module.exports = {
    getNow
}