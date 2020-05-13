const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')


const schema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: [4, "Your username must be at least 4 characters"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [4, "Your password must be at least 4 characters"]

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    firstname: {
        type: String,
        maxlength: [20, "Your firstname must be shorter than 20 characters"]
    },
    lastname: {
        type: String,
        maxlength: [20, "Your lastname must be shorter than 20 characters"]
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
});

schema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    // delete userObject

    return userObject;
}

//hashing password before save data user to DB
schema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})


const User = mongoose.model('User', schema);


module.exports = {
    User
}