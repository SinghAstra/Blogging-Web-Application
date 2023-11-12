import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
    const {id} = useParams();
    const [post,setPost] = useState();
    fetch(`https://snapblog-api.onrender.com/api/post/${id}`)
    .then(res=>res.json())
    .then(res=>{
       setPost(res.post);
    })
    if(!post){
        return <h2>Loading...</h2>
    }
  return (
    <div className='postDetail-container'>
        <img src={post.image} alt='postDetail-image'/>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
    </div>
  )
}

export default PostDetail