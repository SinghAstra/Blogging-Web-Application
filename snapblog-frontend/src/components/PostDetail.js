import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  if (!post) {
    return <h1>Post Not Found</h1>
  }
  return (
    <div>
      <img src={post.image} alt='postDetail' />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export default PostDetail