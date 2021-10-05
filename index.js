require('dotenv').config();

const PORT = 3000;
const express = require('express');
const server = express();

const {client} = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
})

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const {
    apiRouter, 
    postsRouter,
    tagsRouter
} = require('./api');

server.use('/api', apiRouter);
server.use('/posts', postsRouter);
server.use('/tags', tagsRouter);

server.use((req, res, next) => {
    console.log("BODY LOGGER START");
    console.log(req.body);
    console.log("BODY LOGGER END");

    next();
})