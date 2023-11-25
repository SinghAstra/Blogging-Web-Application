const slugify = require('slugify');
const Blog = require('../Models/blog')
const User = require('../Models/user')
const jwt = require('jsonwebtoken');

const addBlog = async (req, res) => {
    const { JWT_SECRET_KEY } = process.env;
    const authorization = req.headers.authorization
    if (!(authorization && authorization.startsWith("Bearer"))) {
        return res.json({
            "success": false,
            "message": "You are not authorised to access this route."
        })
    }
    const access_token = authorization.split(" ")[1]
    const decoded = jwt.verify(access_token, JWT_SECRET_KEY);
    if (!decoded) {
        return res.json({
            "success": false,
            "message": "You are not authorised to access this route."
        })
    }
    const user = await User.findById(decoded.id);
    req.user = user;
    const { title, content, image } = req.body;
    const slug = slugify(title);
    const newBlog = new Blog({ title, content, image, slug, author: user.id });
    newBlog.save().then(blog => {
        res.json({
            success: true,
            blog
        })
    }).catch(err => {
        res.json({
            success: false,
            err
        })
    })
}

const getAllBlogs = (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json({
                success: true,
                blogs
            })
        }).catch(err => {
            res.json({
                success: false,
                err
            })
        })
}

const getBlog = async (req, res) => {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug: slug }).populate("author");
    if(!blog){
        return res.status(200).
        json({
            success: true,
            "message": "Blog Not Found."
        })
    }
    return res.status(200).
        json({
            success: true,
            data: blog
        })
}

const deleteBlog = (req, res) => {
    const { slug } = req.params;
    Blog.findOneAndDelete({ slug: slug }).then(data => {
        return res.status(200).
            json({
                success: true,
                message: "Blog deleted succesfully "
            })
    }).catch(err => {
        return res.
            json({
                success: false,
                message: err
            })
    })
}

const editBlogPage = async (req,res) => {
    const {slug} = req.params;
    const { JWT_SECRET_KEY } = process.env;
    const authorization = req.headers.authorization
    if (!(authorization && authorization.startsWith("Bearer"))) {
        return res.json({
            "success": false,
            "message": "You are not authorised to access this route."
        })
    }
    const access_token = authorization.split(" ")[1]
    const decoded = jwt.verify(access_token, JWT_SECRET_KEY);
    if (!decoded) {
        return res.json({
            "success": false,
            "message": "You are not authorised to access this route."
        })
    }
    const user = await User.findById(decoded.id);
    req.user = user;
    const blog = await Blog.findOne({slug:slug,author:user.id}).populate("author");
    if(!blog){
        return res.json({
            success:false,
            message:"Either Blog does not exist or current User is not authorised."
        })
    }
    return res.json({
        success:true,
        blog
    })
}

module.exports = {
    addBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    editBlogPage
}