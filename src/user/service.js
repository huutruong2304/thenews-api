const { User } = require('./model')
    //GET
const getOneUser = async(id) => {
    return await User.findById(id);
}

const getAllUsers = async() => {
    return await User.find();
}

//POST
const createOneUser = async(data) => {
    const user = await new User({
        ...data
    })
    await user.save();
    return user;
}

//UPDATE
const updateOneUser = async(id, updates) => {
    //lấy keys của object updates -- data truyền vào
    //những keyvalues cho phép update
    //có được phép update ko?
}


//DELETE
const deleteOneUser = async(id) => {
    return await User.findOneAndDelete({ _id: id });
}

const deleteAllUsers = async() => {
    return await User.deleteMany();
}

module.exports = {
    getOneUser,
    getAllUsers,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    deleteAllUsers
}