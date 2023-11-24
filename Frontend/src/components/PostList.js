import React, { useContext, useEffect } from 'react'
import PostCard from './PostCard'
import { PostContext } from '../ContextPage';
import { Link } from 'react-router-dom';


const PostList = () => {
    const {posts,fetchPosts} = useContext(PostContext);
    
    useEffect(() => {
        fetchPosts();
    }, [])

    if(posts.length===0){
        return <h1>Loading....</h1>
    }
    return <div>
        <Link to="/create-post">Create New Post</Link>
        {posts.map(post => {
            return <PostCard post={post} key={post._id}/>
        })}
    </div>
}

export default PostList