import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import LogIn from "./Components/AuthScreen/LogIn";
import Register from "./Components/AuthScreen/Register";
import ForgotPassword from "./Components/AuthScreen/ForgotPassword";
import ResetPassword from "./Components/AuthScreen/ResetPassword";
import AddBlog from "./Components/BlogScreen/AddBlog";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addBlog" element={<AddBlog/>}/>
        <Route path="/logIn" element={<LogIn/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
      </Routes>
    </>
  );
}

export default App;
