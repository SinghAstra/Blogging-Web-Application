const Comment = require('../Models/comment')
const User = require('../Models/user')
const Blog = require('../Models/blog')
const jwt = require('jsonwebtoken');

const addComment = async(req,res) => {
    const { JWT_SECRET_KEY } = process.env;
    const {content} = req.body;
    const {slug} = req.params;
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
    const blog = await Blog.findOne({slug});
    if(!blog){
        return res.json({
            "success":false,
            "messsage":"Blog Not Found."
        })
    }
    const newComment =  new Comment({
        "blog":blog.id,
        content,
        author:req.user.id
    })
    blog.comments.push(newComment.id);
    blog.commentCount = blog.commentCount + 1;
    await blog.save();
    await newComment.save();
    return res.json({
        "status":"success",
        comment:newComment,
        blog
    })
}


module.exports = {
    addComment
}