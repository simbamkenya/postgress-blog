module.exports = app => {
    const posts = require('../controllers/post.controller.js');

    const router = require('express').Router();

    //creating a new post
    router.post('/create', posts.create)

    //show form 
    router.get('/new', posts.new)

    //fetch all posts
    router.get('/postlist', posts.findAll)

    //retrieving a single post by id
    router.get('/:id', posts.findOne)

    //update a post with id
    router.put('/:id', posts.update)

    //delete a post with id
    router.delete('/:id', posts.delete)

    //deleting a post
    router.delete('/', posts.deleteAll)

    app.use('/api/posts', router)

}