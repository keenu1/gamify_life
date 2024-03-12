import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/index";
import Profile from "./pages/profil/index";
import Dashboard from "./pages/dashboard/index";
import News from "./pages/news/index";
import Modal from "./pages/dashboard/modal";
import "izitoast/dist/css/iziToast.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news" element={<News />} />
        {/* delete this when done modal  */}
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
