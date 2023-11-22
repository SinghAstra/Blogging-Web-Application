import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [post,setPost] = useState();

    const fetchPosts = () => {
        fetch(process.env.REACT_APP_DB_URI)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts.posts);
            })
    }

    const fetchPostById = (id) => {
        fetch(process.env.REACT_APP_DB_URI+"/"+id)
        .then(res => res.json())
        .then(post => {
            setPost(post.post);
        })
    }

    return (
        <PostContext.Provider value={{
            posts,
            fetchPosts,
            post,
            fetchPostById
        }}>
            {props.children}
        </PostContext.Provider>
    )
}
