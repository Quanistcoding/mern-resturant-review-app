import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Navigation from "./components/navigation"
import {BrowserRouter as Router,Route,Routes, useNavigate} from "react-router-dom";
import Home from "./components/home"
import Login from "./components/login"
import Resturant from "./components/resturant"
import AddReview from "./components/add-review"

import {useState} from "react";

function App() {
  const [user,setUser] = useState({});
  const navigate = useNavigate();

  const logout = () => {
    setUser({});
    navigate("/");
  }

  const login = (userInfo) => {
    setUser(userInfo);
  }


  return (
    <div>
        <header>
          <Navigation user = {user} logout = {logout}/>
        </header>
      
        <Routes>
          <Route path = "/" exact element={<Home/>}/>
          <Route path = "/login" element={<Login login = {login}/>}/>
          <Route path = "/resturant/:id" element={<Resturant user = {user}/>}/>
          <Route path = "/review/:id" element={<AddReview user = {user}/>}/>
        </Routes>
    </div>
  );
}

export default App;
