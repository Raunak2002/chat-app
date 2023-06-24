import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/> 
    }
    console.log(children);
    return children
  }

  return  <Router>
  <Routes>
    <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route exact path="/register" element={<Register/>} />
    <Route exact path="/login" element={<Login/>} />
  </Routes>
</Router>     
}

export default App;
