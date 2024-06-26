import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditDebt from "./Pages/EditDebt";
import PaymentPage from "./Pages/PaymentPage";
import PageNotFound from "./Pages/PageNotFound";
import { Helmet, HelmetProvider } from "react-helmet-async";
const App = () => {
  return (
    <>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/edit/:id" element={<EditDebt />} />
          <Route path="/dashboard/payment/:id" element={<PaymentPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer
        className="rounded-md  text-sm p-4"
        autoClose={1400}
        pauseOnFocusLoss={true}
        pauseOnHover={false}
        position="top-center"
      />
    </>
  );
};

export default App;
