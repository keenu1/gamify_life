import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { timeout, baseUrl, useNavigation } from "../assets/js/function";
import axios from "axios";

function Login() {
  const [nama, setNama] = useState("");
  const [dropdownProfile, setDropdownProfile] = useState(false);
  const goPage = useNavigation();

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
        alert("Mohon maaf terjadi kesalahan silahkan coba lagi ");
        console.log(error);
      });
  };

  const dropdownProfileToggle = () => {
    setDropdownProfile(!dropdownProfile);
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
        localStorage.setItem("token", "");
        goPage("");
      }
    });
  };

  const handleClickOutside = (event) => {
    const parent = event.target.parentNode;

    if (
      event.target.tagName === "BUTTON" ||
      parent.parentNode.id == "dropdownmenuprofile"
    ) {
      // console.log("mousedown event occurred on a button");
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

  return (
    <>
      <div className="bg-black flex justify-between px-3 py-3 rounded-t-lg font-bold text-white">
        <div className="flex items-center">
          <div className="flex gap-5 ">
            <Link to="/home">Home </Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/news">News</Link>
          </div>
        </div>

        <div></div>
        <div>
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded={dropdownProfile}
              aria-haspopup="true"
              onClick={dropdownProfileToggle}
            >
              {nama}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  ${
              dropdownProfile
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
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                {nama}
              </Link>

              <form onSubmit={logOut}>
                <button
                  type="submit"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-red-400 hover:text-white"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
