const express = require('express');
const bcrypt = require('bcryptjs');
const webToken = require('jsonwebtoken');

const Users = require('./users-model.js');

const secret = process.env.JWT_SECRET;

const router = express.Router();

router.get('/users', validateUser, async (req, res) => {
    const department = req.decodedWebToken.department;
    try {
        const users = await Users.getUsersByDepartment({ department });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to retrieve the list of Users'})
    }
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await Users.getUserBy({ username });

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome ${user.username}!!`, token })
        } else {
            res.status(400).json({ error: 'Invalid Username or Password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to login the User' });
    }
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
            const token = generateToken(user);

            res.status(201).json({user, token });
        } catch(error) {
            console.log(error);
            if(error.errno === 19) {
                res.status(400).json({ error: 'A User with that username already exists' });
            } else {
                res.status(500).json({ error: 'Unable to register the User' });
            }
        }
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1d',
    };

    return webToken.sign(payload, secret, options);
};

function validateUser(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        webToken.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ error: 'You are not authorized to access this information' });
            } else {
                req.decodedWebToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Token is invaild' });
    }
};

module.exports = router;
