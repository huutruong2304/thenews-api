const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser')
const axios = require('axios').default;




if (process.env.HOST_URL) {
    setInterval(() => {
        axios.get(process.env.HOST_URL)
    }, 60 * 1000 * 5 - 200)
} else {
    require('dotenv').config({ path: 'src/config/dev.env' })
}



const { homeController } = require('./home/index');
const { categoryController } = require('./category/index');
const { articleController } = require('./article/index');
const { destinationController } = require('./destination/index');
const { classifyCategoryController } = require('./classify-category/index');
const { userController } = require('./user/index')


const app = express();
const port = process.env.PORT || 3000;

//define paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// //setup express config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

//set up req bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to MongoDB
require('./config/db');

categoryController(app);
articleController(app);
destinationController(app);
classifyCategoryController(app);
userController(app);

homeController(app);


app.listen(port, () => {
    console.log('Server is up to port ' + port);
})