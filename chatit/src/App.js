// import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainApp from "./components/MainApp";
import Login from "./components/Login";
import Register from "./components/Register";
import {FriendIdProvider } from "./ContextAPI/FriendContext"
// import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user info"));
    console.log(userInfo)
    setUser(userInfo);
 
  }, [])
  
  return (
    <FriendIdProvider>
      <Router>
        <div className="App">
          <Routes>
              <Route exact path="/" element={user? <MainApp />: <Navigate replace to="/login"/>}/>
              <Route path="/login" element={user? <Navigate replace to="/"/> : <Login />}/>
              <Route path="/register" element={<Register />}/>
          </Routes>
        </div>
    </Router>
   </FriendIdProvider>
  );
}

export default App;
