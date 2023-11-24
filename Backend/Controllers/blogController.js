const slugify = require('slugify');
const Blog = require('../Models/blog')

const addBlog = (req,res) =>{
    const {title,content,image} = req.body;
    const slug = slugify(title);
    const newBlog = new Blog({title,content,image,slug});
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

const getBlog = (req,res) =>{
    const {slug}=req.params ;
    Blog.findOne({ slug: slug })
    .then(blog=>{
        res.status(200).
        json({
            success:true,
            data : blog
        })
    })
}

const deleteBlog = (req,res) =>{
    const {slug} = req.params  ;
    Blog.findOneAndDelete({slug : slug }).then(data=>{
        return res.status(200).
            json({
                success:true,
                message : "Blog deleted succesfully "
        })
    }).catch(err=>{
        return res.
            json({
                success:false,
                message : err
        })
    })
}

module.exports = {
    addBlog,
    getAllBlogs,
    getBlog,
    deleteBlog
}