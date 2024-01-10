import "./App.css";
import React, { useState } from "react";

import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Home } from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/Note/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
// import  Alert  from "bootstrap";
import Alert from "./Components/Alert";


function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (msg,type) =>{
    console.log("ShowAlert hitted")
    setAlert({
      msg : msg, type : type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} /> 
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} /> 
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} /> 
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
