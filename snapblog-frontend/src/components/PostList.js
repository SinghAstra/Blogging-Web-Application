import React from 'react'
import Post from './Post'
import ManWalkingAnimation from './ManWalkingAnimation'


const PostList = ({ posts }) => {
    if (posts.length === 0) {
        return <ManWalkingAnimation/>
    }
    return <div className='post-container'>
        {posts.map(post => {
            return <Post post={post} />
        })}
    </div>
}

export default PostList