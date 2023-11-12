import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ManWalkingAnimation from './ManWalkingAnimation';

const PostDetail = () => {
    const {id} = useParams();
    const [post,setPost] = useState();
    fetch(`https://snapblog-api.onrender.com/api/post/${id}`)
    .then(res=>res.json())
    .then(res=>{
       setPost(res.post);
    })
    if(!post){
        return <ManWalkingAnimation/>
    }
  return (
    <div className='postDetail-container'>
        <img src={post.image} alt='postDetail'/>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
    </div>
  )
}

export default PostDetail