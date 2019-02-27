const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const router = express.Router();

router.get('/users', async (req, res) => {

});

router.post('/login', async (req, res) => {

});

router.post('/register', async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.department) {
        res.status(400).json({ error: 'The user requires a username, password and a department' });
    } else {
        try {
            let newUser = req.body;
            const hash = bcrypt.hashSync(req.body.password, 12);

            newUser.password = hash;

            const user = await Users.addUser(newUser);

            res.status(201).json(user);
        } catch(error) {
            console.log(error);
            if(error.errno === 19) {
                res.status(400).json({ error: 'A User with that username already exists' });
            } else {
                res.status(500).json(error);
            }
        }
    }
});

module.exports = router;
