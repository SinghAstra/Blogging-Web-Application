import React from 'react'
import { Link } from 'react-router-dom'

const Post = (props) => {
    const post = props.post;
    return (
        <Link to={`/post/${post._id}`} key={post._id}>
        <div className='post' >
            <img src={post.image} alt='post-thumbnail'/>
            <div className='post-content'>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 300)}....</p>
            </div>
        </div>
        </Link>
    )
}

export default Post