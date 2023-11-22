import PostList from "./components/PostList";
import { Route, Routes } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import { PostProvider } from "./ContextPage";


function App() {

  return (
    <>
    <PostProvider>
      <Routes>
        <Route path="/" element={<PostList />}/>
        {/* <Route path="/post/:id" element={<PostDetail/>}/> */}
      </Routes>
    </PostProvider>
    </>
  );
}

export default App;
