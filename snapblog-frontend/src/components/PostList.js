import React, { useContext, useEffect } from 'react'
import PostCard from './PostCard'
import { PostContext } from '../ContextPage';


const PostList = () => {
    const {posts,fetchPosts} = useContext(PostContext);
    
    useEffect(() => {
        fetchPosts();
    }, [])

    if(posts.length===0){
        return <h1>Loading....</h1>
    }
    return <div>
        {posts.map(post => {
            return <PostCard post={post} key={post._id}/>
        })}
    </div>
}

export default PostList