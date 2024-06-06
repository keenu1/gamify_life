import { useState } from "react";
import {
  useNavigation,
  baseUrl,
  alertPopupError,
  catchErrorConnection,
  alertBottom,
  ShowLoading,
  CloseLoading,
  timeout
} from "../../assets/js/function";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";
import loginLogo from "../../assets/img/banner.avif";

function Login() {
  const [myObject, setMyObject] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [modalForgotPass, setModalForgotPass] = useState(true);
  const [emailValid, setemailValid] = useState(true);

  const GoPage = useNavigation();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setMyObject({
      ...myObject,
      [id]: value,
    });
  };

  const signin = (event) => {
    event.preventDefault();
    ShowLoading();

    let formData = new FormData();

    Object.entries(myObject).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // this.token = Cookies.get("token_refresh");
    const config = {
      timeout: timeout(),
    };

    const api = baseUrl() + "login";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {

          Cookies.set("token", response.data.data);
          GoPage("home");
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

  const cekEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setemailValid(re.test(myObject.email));
  }

  const forgotPass = () => {

    ShowLoading();
    if (emailValid == false) {
      alertPopupError("the email is not valid");
      return true;
    }

    const config = {
      timeout: timeout(),
    };

    let formData = new FormData();

    Object.entries(myObject).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const api = baseUrl() + "forgot_pass";

    axios
      .post(api, formData, config)
      .then((response) => {
        console.log(response);
        if (response.data.status === true) {
          Cookies.set("token", response.data.token);
          Cookies.set("email", myObject.email);
          alertBottom('OTP Sent', 'the OTP has been sent!, please check your email.')
          GoPage("confirm_otp");

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
    backgroundImage: `url(${loginLogo})`,
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
                <div className="text-xl font-bold">LOGIN</div>
                <div className="text-xs">Enter your username and password </div>
              </div>

              <form className="w-full flex flex-col gap-5" onSubmit={signin}>
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <input
                      className="rounded-lg pl-10 pr-4 appearance-none border-1 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-x focus:border-y focus:border-black transition duration-300"
                      id="username"
                      value={myObject.username}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="username"
                      required
                    />
                    <i className="bx bx-user absolute top-0 left-0 mt-3 ml-3 text-gray-500"></i>
                  </div>
                  <div className="relative">
                    <input
                      className="pl-10 pr-4 rounded-lg appearance-none border-1 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:ring-0  focus:outline-none focus:bg-white focus:border-x focus:border-y  focus:border-black transition duration-300"
                      id="password"
                      type="password"
                      placeholder="password"
                      value={myObject.password}
                      onChange={handleInputChange}
                      required
                    />
                    <i className="bx bx-key absolute top-0 left-0 mt-3 ml-3 text-gray-500"></i>
                  </div>

                  <div className="text-xs text-end hover:cursor-pointer hover:font-semibold transition-all" onClick={() => setModalForgotPass(false)} >
                    Forgot Password ?
                  </div>

                </div>

                <div className="pt-5">
                  <button className="shadow bg-black hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-6 rounded-2xl w-auto hover:shadow-lg transition duration-300">
                    Login
                  </button>
                </div>

                <div className="pt-2">
                  <div className=" text-sm">Don't have account ?  <Link
                    to="/register"
                    className="hover:text-blue-600 font-semibold"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    click here
                  </Link></div>
                </div>
              </form>
            </div>


          </div>

          <div className=" h-full  sm:w-1/2 hidden sm:block" style={backgroundStyle}>

          </div>
        </div>
      </div >


      <form onSubmit={(event) => { event.preventDefault(); forgotPass(); }}>
        <div
          className={`relative z-10 ${modalForgotPass
            ? "ease-out opacity-0 duration-200 pointer-events-none"
            : "ease-in opacity-100 duration-300"
            }`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >


          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">

              <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${modalForgotPass
                ? "ease-in duration-200 opacity-0 translate-y-0 sm:translate-y-0 sm:scale-95"
                : "ease-out duration-300 opacity-100 translate-y-4 sm:scale-100"
                }`}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(0,0,0,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left  w-full">
                      <div className="flex justify-between">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Reset Password
                        </h3>

                      </div>

                      <div className="relative">
                        <input
                          className={`rounded-lg pl-10 pr-4 appearance-none border-1 w-full py-2 px-4 leading-tight  focus:ring-0 focus:outline-none focus:bg-white focus:border-x focus:border-y transition duration-300 ${emailValid ? "border-gray-200  text-gray-700   focus:border-black " : "border-pink-500  text-pink-600   focus:border-pink-500"} `}
                          id="email"
                          value={myObject.email}
                          onChange={handleInputChange}
                          type="text"
                          placeholder="email"
                          onBlur={cekEmail}
                          required
                        />
                        <div className="h-full absolute top-0 left-0 ml-3 flex items-center">
                          <i className="bx bxl-gmail text-gray-500 "></i>
                        </div>

                        {emailValid ? null : <i className='bx bx-error-circle absolute top-0 right-0 me-3 mt-3 ml-3 text-pink-500' ></i>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black sm:ml-3 sm:w-auto"
                  >
                    Send OTP
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setModalForgotPass(true)}
                  >
                    Close
                  </button>

                </div>
              </div>
            </div>
          </div>

        </div>
      </form >


    </>
  );
}

export default Login;
