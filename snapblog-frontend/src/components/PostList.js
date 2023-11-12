import React from 'react'
import Post from './Post'


const PostList = ({ posts }) => {
    if (posts.length === 0) {
        return <h2>Loading...</h2>
    }
    return <div className='post-container'>
        {posts.map(post => {
            return <Post post={post} />
        })}
    </div>
}

export default PostList