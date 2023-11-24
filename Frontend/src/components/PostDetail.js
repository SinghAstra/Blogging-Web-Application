import React, { useContext, useEffect } from 'react'
import { PostContext } from '../ContextPage'
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const {post,fetchPostById,deletePostById} = useContext(PostContext);
  const {id} = useParams();
  useEffect(()=>{
    fetchPostById(id);
  },[id])
  if (!post) {
    return <h1>Loading....</h1>
  }
  return (
    <div>
      <img src={post.image} alt='postDetail' />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={()=>deletePostById(id)}>Delete Post</button>
    </div>
  )
}

export default PostDetail