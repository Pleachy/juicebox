const express = require('express');
const tagsRouter = express.Router();

const {getAllTags} = require('../db');

tagsRouter.use((req, res, next) => {
    next();
})

tagsRouter.get('/', async (req, res, next) => {
    const tags = await getAllTags();

    res.send({
        tags: tags
    });
});

module.exports = tagsRouter;