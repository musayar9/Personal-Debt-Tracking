import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
          <Route path="/dashboard" element={<Dashboard />} />
     
      </Routes>
    </>
  );
};

export default App;
