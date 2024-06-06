import defaultImage from "../../assets/img/default.png";
import Navbar from "../../components/navbar";
import React, { useState, useEffect, useRef } from "react";

function Login() {

  const [showMenu, setShowMenu] = useState(JSON.parse(localStorage.getItem('showMenu')));

  useEffect(() => {

    window.addEventListener('storage', () => {
      setShowMenu(JSON.parse(localStorage.getItem('showMenu')))
      // ...
    })
  }, []);
  return (
    <>
      <div className={`flex transition-all ease-in-out duration-500   ${showMenu ? "md:gap-11 lg:gap-2" : "md:gap-4 lg:gap-2"} `}>
        <div className={`  transition-all ease-in-out duration-500 ${showMenu ? "w-0 md:w-1/5" : "w-0 md:w-16"}`} ></div>
        <div className={` transition-all ease-in-out duration-500 grow h-screen  border p-2 lg:p-5 rounded-xl shadow-lg mx-2 mt-2 lg:mt-0   ${showMenu ? " " : ""}`}> Coming soon</div>
      </div>
      <Navbar />

    </>
  );
}

export default Login;
