const express = require('express');
const postsRouter = express.Router();

const {getAllPosts, createPost} = require('../db');
const {requireUser} = require('./utils');

postsRouter.use((req, res, next) => {
    next();
});

postsRouter.get('/' , async (req, res, next) => {
    const posts = await getAllPosts();

    res.send({
        posts: posts
    })
})

postsRouter.post('/', requireUser, async (req, res, next) => {
    const {title, content, tags = ""} = req.body;

    const tagArr = tags.trim().split(/\s+/);
    const postData = {};

    //only send tags if there are some to send
    if (tagArr.length) {
        postData.tags = tagArr;
    }

    try {
        postData.authorId = req.user.id;
        postData.title = title;
        postData.content = content;
        postData.tags = tagArr;

        const post = await createPost(postData);

        if (post) {
            res.send({post});
        } else {
            next({
                name: 'PostCreationerror',
                message: 'Invalid fields for post'
            })
        }

    } catch ({name, message}) {
        next ({name, message})
    }


    res.send({message: "under constructsion"});
})

module.exports = postsRouter;