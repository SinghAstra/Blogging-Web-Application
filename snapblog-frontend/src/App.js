import PostList from "./components/PostList";
import { Route, Routes } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import { PostProvider } from "./ContextPage";
import CreatePost from './pages/CreatePost';


function App() {

  return (
    <>
    <PostProvider>
      <Routes>
        <Route path="/" element={<PostList />}/>
        <Route path="/post/:id" element={<PostDetail/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
      </Routes>
    </PostProvider>
    </>
  );
}

export default App;
