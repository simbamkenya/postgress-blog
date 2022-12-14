const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op;
const Joi = require('joi')

exports.f = (req,res) => {
    res.render('/create')
}

//creating and save new post
exports.create = async (req, res) => {
    //validate request
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required().min(20),
    })

    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //create a post
    const post = {
        title: req.body.title,
        description: req.body.description
    }
    //save post
    await Post.create(post)

    res.redirect('/api/posts/postlist')

}
//show form
exports.new = async (req, res) => {
    res.render('new')
}
//fetch all posts from db
exports.findAll = async (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.isLike]: `%${title}%`} } : null;

    const posts = await Post.findAll({ where: { } })
    res.render('index', { posts: posts })

}


//find a single post with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findByPk(id)
    res.status(200).send(post)
}

//update a post by id
exports.update = async (req, res) => {
    const id = req.params.id;

      //validate request
      const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required().min(20),
    })

    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //create a post
    const post = {
        title: req.body.title,
        description: req.body.description
    }

    const updatePost = await Post.update(req.body, {
        where: { id: id}
    })

    res.status(200).send(updatePost)

}

//delete a specific post with id
exports.delete = async (req, res) => {
    const id = req.params.id;
    
    Post.destroy({
        where: { id:id }
    })
    res.status(200).send('post deleted')
    

}

//delete all posts in a db
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    })

    res.status(200).send('deletedpost')
}