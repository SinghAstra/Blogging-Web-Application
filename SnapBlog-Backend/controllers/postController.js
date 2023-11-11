const Post = require('../models/Post');

module.exports.createPost = (req, res) => {
    const { title, content, image } = req.body;
    const post = new Post({ title, content, image });
    post.save().then(post => {
        res.json({ post })
    }).catch(err => {
        res.send('Error creating post.');
    })
};

module.exports.getAllPosts = async (req, res) => {
    Post.find({}).then(posts => {
        res.json({ posts })
    }).catch(err => {
        console.log(err);
        res.json({ msg: "Error While Fetching Posts." })
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

