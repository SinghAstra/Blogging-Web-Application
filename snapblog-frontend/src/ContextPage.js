import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        fetch(process.env.REACT_APP_DB_URI)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts.posts);
            })
    }

    return (
        <PostContext.Provider value={{
            posts,
            fetchPosts
        }}>
            {props.children}
        </PostContext.Provider>
    )
}
