import { useState } from "react";
import {
  useNavigation,
  baseUrl,
  alertPopupError,
  catchErrorConnection,
  ShowLoading,
  CloseLoading,
  alertBottom,
  timeout
} from "../../assets/js/function";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";

function Login() {
  const [myObject, setMyObject] = useState({

    password: "",
    password_2: "",

  });

  const GoPage = useNavigation();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setMyObject({
      ...myObject,
      [id]: value,
    });


  };

  const register = (event) => {
    event.preventDefault();
    ShowLoading();

    if (myObject.password != myObject.password_2) {
      alertPopupError('the password is not match');
      return true;
    }

    let formData = new FormData();

    Object.entries(myObject).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('token', Cookies.get("token"));

    const api = baseUrl() + "change_pass";

    const config = {
      timeout: timeout(),
    };
    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {
          Cookies.set("token", "");
          GoPage("");
          alertBottom("success", response.data.message)
          CloseLoading();
        }
        if (response.data.status === false) {
          alertPopupError(response.data.message);
        }
      })
      .catch((error) => {
        catchErrorConnection(error)
      });


    // GoPage("home");
  };







  //styeling 
  const backgroundStyle = {
    backgroundImage: 'url("/src/assets/img/banner.avif")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    // Adjust as needed
  };

  return (
    <>
      <div className=" h-screen bg-black p-2 lg:p-10 ">
        <div className=" bg-white h-full rounded-xl  flex items-center justify-center shadow-md shadow-white">
          <div className=" h-full w-full sm:w-1/2 text-center flex flex-col ">
            <div className="h-full flex flex-col items-center justify-center gap-10 px-10 sm:px-10 md:px-15 lg:px-32">
              <div>
                <div className="text-xl font-bold">Change password</div>
                <div className="text-xs">Enter new password <data value=""></data></div>
              </div>

              <form className="w-full flex flex-col gap-5" onSubmit={register}>
                <div className="flex flex-col gap-2">

                  <div className="relative">
                    <input
                      className="pl-10 pr-4 rounded-lg appearance-none border-1 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:ring-0  focus:outline-none focus:bg-white focus:border-x focus:border-y  focus:border-black transition duration-300"
                      id="password"
                      value={myObject.password}
                      onChange={handleInputChange}
                      type="password"
                      placeholder="new Password"
                      required
                    />

                    <i className="bx bx-key absolute top-0 left-0 mt-3 ml-3 text-gray-500"></i>

                  </div>
                  <div className="relative">
                    <input
                      className="pl-10 pr-4 rounded-lg appearance-none border-1 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:ring-0  focus:outline-none focus:bg-white focus:border-x focus:border-y  focus:border-black transition duration-300"
                      id="password_2"
                      value={myObject.password_2}
                      onChange={handleInputChange}
                      type="password"
                      placeholder="confirm Password"
                      required
                    />

                    <i className="bx bx-key absolute top-0 left-0 mt-3 ml-3 text-gray-500"></i>

                  </div>

                </div>

                <div className="pt-5">
                  <button className="shadow bg-black hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-6 rounded-2xl w-auto hover:shadow-lg transition duration-300">
                    Change
                  </button>
                </div>
              </form>
            </div>


          </div>

          <div className=" h-full  sm:w-1/2 hidden sm:block" style={backgroundStyle}>

          </div>
        </div>
      </div >


    </>
  );
}

export default Login;
