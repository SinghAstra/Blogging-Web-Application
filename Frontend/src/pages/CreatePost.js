import React, { useContext, useState } from 'react'
import { PostContext } from '../ContextPage';

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [image,setImage] = useState('');
    const {createPost} = useContext(PostContext);

    const handleSubmit = (e) =>{
        e.preventDefault();
        createPost({title,content,image});
    }
    return (
    <form onSubmit={handleSubmit}>
        <input type='text' value={title} onChange={e=>setTitle(e.target.value)} placeholder='title' required/>
        <input type='text' value={content} onChange={e=>setContent(e.target.value)} placeholder='content' required/>
        <input type='text' value={image} onChange={e=>setImage(e.target.value)} placeholder='image' required/>
        <button type='submit'>Add Post</button>
    </form>
    )
}

export default CreatePost