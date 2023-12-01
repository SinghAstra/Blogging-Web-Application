const slugify = require('slugify');
const Blog = require('../Models/blog')
const User = require('../Models/user')
const jwt = require('jsonwebtoken');

const addBlog = async (req, res) => {
    const { JWT_SECRET_KEY } = process.env;
    const authorization = req.headers.authorization
    if (!(authorization && authorization.startsWith("Bearer"))) {
        return res.status(400).json({
            "success": false,
            error: "You are not authorised to access this route."
        })
    }
    const access_token = authorization.split(" ")[1]
    const decoded = jwt.verify(access_token, JWT_SECRET_KEY);
    if (!decoded) {
        return res.status(400).json({
            "success": false,
            error: "You are not authorised to access this route."
        })
    }
    const user = await User.findById(decoded.id);
    req.user = user;
    const { title, content, image } = req.body;
    const slug = slugify(title);
    const newBlog = new Blog({ title, content, image: "image", slug, author: user.id });
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
    let query = Blog.find();
    if (req.query.search) {
        console.log("inside the if statement");
        const searchObject = {};
        const regex = new RegExp(req.query.search, "i")
        searchObject['title'] = regex
        query = query.where(searchObject);
        // return query
    }
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
    if (!blog) {
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

const deleteBlog = async (req, res) => {
    const { slug } = req.params;
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
    const blog = await Blog.findOne({ slug: slug, author: user.id });
    if (!blog) {
        return res.json({
            "success": false,
            "message": "Either no such blog exists or you are not authorised to access this route."
        })
    }
    await blog.remove()
    return res.json({
        "success": true,
        blog
    })
}

const editBlogPage = async (req, res) => {
    const { slug } = req.params;
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
    const blog = await Blog.findOne({ slug: slug, author: user.id }).populate("author");
    if (!blog) {
        return res.json({
            success: false,
            message: "Either Blog does not exist or current User is not authorised."
        })
    }
    return res.json({
        success: true,
        blog
    })
}

const updateBlog = async (req, res) => {
    const { slug } = req.params;
    const { JWT_SECRET_KEY } = process.env;
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
        return res.json({
            "success": false,
            "message": "Missing Credentials."
        })
    }
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
    const blog = await Blog.findOne({ slug: slug, author: user.id });
    if (!blog) {
        return res.json({
            "success": false,
            "message": "Either No Such Blog Exists or You are not authorised."
        })
    }
    blog.title = title;
    blog.slug = slugify(title);
    blog.content = content;
    blog.image = image;
    await blog.save();
    return res.json({
        "success": true,
        blog
    })
}

const likeBlog = async (req, res) => {
    const { slug } = req.params;
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
    const blog = await Blog.findOne({ slug: slug });
    if (!blog) {
        return res.json({
            "success": false,
            "message": "No such blog exist"
        })
    }
    let blogLikes = blog.likes.map(json => json._id.toString())
    const userLikeStatus = blogLikes.includes(req.user.id);
    if (userLikeStatus) {
        blog.likes = blogLikes.filter(userId => {
            return userId !== req.user.id
        });
        blog.likeCount = blog.likeCount - 1;
    } else {
        blog.likes.push(req.user.id);
        blog.likeCount = blog.likeCount + 1;
    }
    await blog.save();
    return res.json({
        "success": true,
        blog
    })

}

module.exports = {
    addBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    editBlogPage,
    updateBlog,
    likeBlog
}