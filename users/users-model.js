const db = require('../db/dbconfig.js');

module.exports = {
    getUsers,
    getUserBy,
    getUserById,
    addUser,
    getUsersByDepartment,
    remove
};

function getUsers() {
    return db('users');
}

function getUserBy(username) {
    return db('users').where(username).first();
}

async function addUser(user) {
    const [id] = await db('users').insert(user);

    return getUserById(id);
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

function getUsersByDepartment(department) {
    return db('users').where(department);
}