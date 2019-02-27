const db = require('../db/dbconfig.js');

module.exports = {
    getUsers,
    getUsersBy,
    getUserById,
    addUser,
    remove
};

function getUsers() {
    return db('users');
}

function getUsersBy(username) {
    return db('users').where(username).first();
}

function addUser(user) {
    return db('users')
        .insert(user)
        .then(id => {
            return getUserById(id);
        });
}

function getUserById(id) {
    return db('users')
        .where({ id })
        .first();
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}