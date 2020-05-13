const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// mongodb+srv://user234:<password>@cluster0-4tl1d.mongodb.net/test?retryWrites=true&w=majority