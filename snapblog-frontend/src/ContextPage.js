import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState();

    const fetchPosts = () => {
        fetch(process.env.REACT_APP_DB_URI)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts.posts);
            })
    }

    const fetchPostById = (id) => {
        fetch(process.env.REACT_APP_DB_URI + "/" + id)
            .then(res => res.json())
            .then(post => {
                setPost(post.post);
            })
    }

    const createPost = ({ title, content, image }) => {
        fetch(process.env.REACT_APP_DB_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, image }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Post created successfully:', data);
                fetchPosts();
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error);
            });

    }

    return (
        <PostContext.Provider value={{
            posts,
            fetchPosts,
            post,
            fetchPostById,
            createPost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}
