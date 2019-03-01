const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./users/users-route.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api', userRoutes);

module.exports = server;