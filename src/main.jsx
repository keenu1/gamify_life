import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import Profile from "./pages/profil/index";
import Dashboard from "./pages/dashboard/index";
import News from "./pages/news/index";
import Cookies from "js-cookie";
import "izitoast/dist/css/iziToast.min.css";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get("token");

  return token ? <Component {...rest} /> : <Navigate to="/" />;
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        {/* Protected routes */}
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/news" element={<ProtectedRoute component={News} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
