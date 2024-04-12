import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { timeout, baseUrl, useNavigation, alertPopupError, catchErrorConnection } from "../assets/js/function";

import axios from "axios";

function Login() {
  const [nama, setNama] = useState("");

  const [dropdownProfile, setDropdownProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const goPage = useNavigation();
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  const loadUserData = () => {
    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };

    const api = baseUrl() + "profile";

    axios
      .post(api, "", config)
      .then((response) => {
        if (response.data.status === true) {
          setNama(response.data.data[0].name);

        }
        if (response.data.status === false) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        catchErrorConnection(error);
      });

  };

  const dropdownProfileToggle = () => {
    setDropdownProfile(!dropdownProfile);

    // console.log(dropdownProfile);
  };
  const showMenuToggle = () => {
    setShowMenu(!showMenu);
    window.localStorage.setItem("showMenu", !showMenu);
    window.dispatchEvent(new Event("storage"));

    // console.log(dropdownProfile);
  };

  const logOut = (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Do you really wanna log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Cookies.set("token", "");

        goPage("");
      }
    });
  };

  const handleClickOutside = (event) => {

    const parent = event.target.parentNode;

    if (event.target.tagName === "HTML"

    ) {
      setDropdownProfile(false);
      // console.log("mousedown event occurred on a button");
    } else if (event.target.id != undefined && (event.target.tagName === "BUTTON" || parent.parentNode.id == "dropdownmenuprofile" ||
      event.target.id == 'menu-icon' ||
      event.target.id == 'profil-name')) {

    } else {
      setDropdownProfile(false);
    }
  };

  useEffect(() => {
    loadUserData();

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); //

  const Profile = {
    backgroundImage: 'url("/src/assets/img/default.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // Adjust as needed
  };



  return (
    <>
      <aside className={`bg-white h-screen shadow-lg rounded-r-xl absolute top-0  transition-all duration-500 ease-in-out ${showMenu ? "w-1/5  " : "w-16"}`}>

        <nav className="flex flex-col justify-between  items-center h-full">
          <div className={`flex flex-col  gap-4 p-4 w-full ${showMenu ? "items-start" : "items-center"}`}>
            <div className="flex justify-between  items-center w-full">
              <div className={`flex items-center   w-full font-semibold`}>
                <div className="flex">
                  <img
                    src="/src/assets/img/logo_tab.jpeg"
                    alt=""
                    className={`rounded-full w-7 flex-none ${showMenu ? 'w-7' : 'w-7'}`}

                  />
                  <span className={`ms-2 transition-all  flex-none ${showMenu ? ' delay-300 duration-200 ease-in-out opacity-100 translate-x-0 ' : 'opacity-0 duration-0 translate-x-[-10px]'}`}>
                    Gamify Life
                  </span>
                </div>

              </div>
              <div className={`bg-gray-100 rounded-lg  px-1 hover:cursor-pointer hover:bg-gray-200 ${showMenu ? "" : "hidden"}`}>
                <i className='bx bx-chevron-left mt-1' onClick={showMenuToggle}></i>
              </div>
            </div>
            <div className={`bg-gray-100 rounded-lg  px-1 hover:cursor-pointer hover:bg-gray-200 ${showMenu ? "hidden" : ""}`}>
              <i className='bx bx-chevron-right mt-1' onClick={showMenuToggle}></i>
            </div>

            <div className={`flex flex-col gap-2 ${showMenu ? "w-full" : ""}`}>
              <Link
                to="/home"
                className={`${isActive("/home") ? "bg-gray-100 text-black font-medium " : "text-gray-500 hover:font-medium hover:text-black "
                  } relative flex items-center rounded-lg px-3 py-2`}
              >
                <i className='bx bx-home-circle '></i>

                <span className={`ms-6 flex-none absolute   transition-all  ${showMenu ? "opacity-100 transform translate-x-0 duration-200 delay-300" : "opacity-0 translate-x-[-20px] duration-0 "}`}> Home</span>
              </Link>
              <Link
                to="/dashboard"
                className={`${isActive("/dashboard") ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:font-medium hover:text-black"
                  } flex items-center rounded-lg px-3 py-2`}
              >
                <i className='bx bxs-dashboard' ></i>
                <span className={`ms-6 flex-none absolute   transition-all  ${showMenu ? "opacity-100 transform translate-x-0 duration-200 delay-500" : "opacity-0 translate-x-[-20px] duration-0 "}`}> Dashboard</span>
              </Link>
              <Link
                to="/news"
                className={`${isActive("/dashboard") ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:font-medium hover:text-black"
                  } flex items-center rounded-lg px-3 py-2`}
              >
                <i className='bx bxs-news' ></i>
                <span className={`ms-6 flex-none absolute   transition-all  ${showMenu ? "opacity-100 transform translate-x-0 duration-200 delay-700" : "opacity-0 translate-x-[-20px] duration-0 "}`}> News </span>

              </Link>
            </div>

          </div>
          <div className="p-3 w-full  ">
            <div className="w-full  flex justify-center items-center gap-2">
              <div className="w-8 h-8 rounded-lg  " style={Profile}>

              </div>
              <div className={`grow ${showMenu ? "" : "hidden"}`}>
                <button
                  type="button"
                  className={`inline-flex w-full justify-between items-center gap-x-1.5   px-3 py-2 text-sm font-semibold text-gray-900 rounded-lg hover:bg-gray-100 ${dropdownProfile ? "bg-gray-100" : "bg-white"} `}
                  id="menu-button"
                  aria-expanded={dropdownProfile}
                  aria-haspopup="true"
                  onClick={dropdownProfileToggle}

                >
                  <span className={`ms-2 `} id="profil-name">
                    {nama}

                  </span>
                  <i id="menu-icon" className={`bx bx-dots-vertical-rounded z-0 `}></i>


                </button>
              </div>

            </div>

            <div
              className={`absolute bottom-0 mb-3 ms-52  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  ${dropdownProfile
                ? "transform opacity-100 scale-100 transition ease-out duration-100 "
                : "transform opacity-0 scale-95 transition ease-in duration-75  pointer-events-none"
                }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
              id="dropdownmenuprofile"
            >
              <div className="py-1" role="none">
                <Link
                  to="/profile"
                  className="text-gray-700 flex items-center px-4 py-2 text-sm hover:font-medium hover:text-black"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  <i className='bx bx-user me-2'></i> Profil
                </Link>

                <form onSubmit={logOut}>
                  <button
                    type="submit"
                    className="text-gray-700 w-full px-4 py-2 text-left text-sm flex items-center  hover:text-red-500 hover:font-medium"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    <i className='bx bx-log-out me-2'></i>Log out
                  </button>
                </form>
              </div>
            </div>
          </div>


        </nav>

      </aside>

    </>
  );
}

export default Login;
