import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Register from "./components/Register";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/logIn" element={<LogIn/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
