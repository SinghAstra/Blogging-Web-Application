import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import { Route, Routes } from "react-router-dom";
import PostDetail from "./components/PostDetail";

function App() {
  const [posts,setPosts] = useState([]);
  // useEffect(()=>{
  //   fetch("https://snapblog-api.onrender.com/api/post")
  //   .then(res=>res.json())
  //   .then(posts=>{
  //     setPosts(posts.posts);
  //   })
  // },[])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList posts={posts}/>}/>
        <Route path="/post/:id" element={<PostDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
