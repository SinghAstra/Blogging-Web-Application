const Post = require('../models/Post');

module.exports.createPost = (req, res) => {
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
        return res.json({ "message": "title, content and image are compulsory." })
    }
    const post = new Post({ title, content, image });
    post.save().then(post => {
        res.json({ post })
    }).catch(err => {
        res.send('Error creating post.');
    })
};


module.exports.getPostById = (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
        .then((post) => {
            if (!post) {
                return res.status(404).send('Post not found');
            }
            res.json({ post })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error fetching post by ID');
        });
};

module.exports.updatePostById = (req, res) => {
    const id = req.params.id;
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
        return res.json({ "message": "title, content and image are compulsory." })
    }
    Post.findByIdAndUpdate(id, { title, content, image })
        .then(data => {
            res.json({
                message: "Post Updated Successfully.",
                data
            })
        })
        .catch(err => {
            res.json({ err });
        })
}

module.exports.deletePostById = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
        .then(data => {
            res.json({
                message: "Post Deleted Successfully",
                data
            })
        })
        .catch(err => {
            res.json({ err })
        })
}


module.exports.getAllPost = (req, res) => {
    Post.find({})
        .sort({ createdAt: -1 })
        .then(posts => { res.json({ posts }) })
        .catch(err => { res.json(err) })
}

