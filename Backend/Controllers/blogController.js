const Blog = require('../Models/blog')

const addBlog = (req,res) =>{
    const {title,content,image} = req.body;
    const newBlog = new Blog({title,content,image});
    newBlog.save().then(blog=>{
        res.json({
            success:true,
            blog
        })
    }).catch(err=>{
        res.json({
            success:false,
            err
        })
    })
}

const getAllBlogs = (req,res) => {
    Blog.find({})
    .then(blogs=>{
        res.json({
            success:true,
            blogs
        })
    }).catch(err=>{
        res.json({
            success:false,
            err
        })
    })
}

module.exports = {
    addBlog,
    getAllBlogs
}