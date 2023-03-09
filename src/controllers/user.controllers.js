const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const user = await User.findAll();
    return res.json(user);
});

const create = catchError(async(req, res) => {
    const { FirstName, LastName, Email, Password, Birthday } = req.body;
    const user = await User.create({ 
        FirstName,
        LastName,
        Email,
        Password,
        Birthday 
    }) 
    return res.status(201).json(user)
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id);
    return res.json(user);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params
    const user = await User.destroy({ where: {id}});
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params
    const { FirstName, LastName, Email, Password, Birthday } = req.body;
    const user = await User.update(
        { FirstName, LastName, Email, Password, Birthday},
        { where: { id }, returning: true} 
    ) 
    return res.status(201).json(user[1][0])  
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}