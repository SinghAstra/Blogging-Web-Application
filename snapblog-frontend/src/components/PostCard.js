import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
    return (
        <Link to={`/post/${post._id}`} key={post._id}>
            <img src={post.image} alt='post-thumbnail' />
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 300)}....</p>
        </Link>
    )
}

export default PostCard