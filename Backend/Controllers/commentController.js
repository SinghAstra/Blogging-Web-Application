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

const getAllCommentbyBlog = async(req,res) => {
    const { slug } = req.params
    const blog = await Blog.findOne({slug:slug})
    if(!blog){
        return res.json({
            success:false,
            message:"No Such Blog Found."
        })
    }
    const commmentList =await Comment.find({
        blog : blog.id 
    }).populate({
        path :"author"
    }).sort("-createdAt")
    return res.status(200)
        .json({
            success: true,
            count: blog.commentCount,
            data: commmentList
        })
}

const commentLike = async(req,res) => {
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
    const { comment_id} =  req.params 
    const comment = await Comment.findById(comment_id)
    if(!comment){
        return res.json({
            success:false,
            message:"Comment Not Found."
        })
    }
    let commentLikes  = comment.likes.map(json => json._id.toString())
    const commentLikeStatus = commentLikes.includes(req.user.id);
    if (commentLikeStatus) {
        comment.likes = commentLikes.filter(userId => {
            return userId !== req.user.id
        });
        comment.likeCount = comment.likeCount - 1;
    } else {
        comment.likes.push(req.user.id);
        comment.likeCount = comment.likeCount + 1;
    }
    await comment.save();
    const updatedLikeStatus = comment.likes.includes(req.user.id)
    return res.status(200)
        .json({
            success: true,
            data : comment,
            likeStatus:updatedLikeStatus
        })
}

const getCommentLikeStatus = async (req,res)=>{
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
    const { comment_id} =  req.params 
    const comment = await Comment.findById(comment_id)
    if(!comment){
        return res.json({
            success:false,
            message:"No Such Comment Found."
        })
    }
    const likeStatus = comment.likes.includes(user.id)
    return res.status(200)
    .json({
        success: true,
        likeStatus:likeStatus
    })
}


module.exports = {
    addComment,
    getAllCommentbyBlog,
    commentLike,
    getCommentLikeStatus
}