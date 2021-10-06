const express = require('express');
const tagsRouter = express.Router();

const {getAllTags, getPostsByTagName} = require('../db');

tagsRouter.use((req, res, next) => {
    next();
})

tagsRouter.get('/', async (req, res, next) => {
    const tags = await getAllTags();

    res.send({
        tags: tags
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const {tagName} = req.params;

    try {
        const taggedPosts = await getPostsByTagName(tagName);

        res.send({posts: taggedPosts});

    } catch ({name, message}) {
        next({name, message});
    }
})

module.exports = tagsRouter;