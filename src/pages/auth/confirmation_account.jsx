import { useState } from "react";
import {
  useNavigation,
  baseUrl,
  alertPopupError,
  catchErrorConnection,
  ShowLoading,
  CloseLoading,
  alertBottom,
} from "../../assets/js/function";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";

function Login() {
  const [myObject, setMyObject] = useState({

    otp: "",

  });
  const [timer, setTimer] = useState("");

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

    let formData = new FormData();

    Object.entries(myObject).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('token', Cookies.get("token"));

    const api = baseUrl() + "aktivasi_akun";

    axios
      .post(api, formData)
      .then((response) => {
        if (response.data.status === true) {
          Cookies.set("token", "");
          GoPage("");
          CloseLoading();
          alertBottom("success", response.data.message)
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

  const forgotPass = () => {
    ShowLoading();

    if (timer != "") {
      alertPopupError("please wait to send OTP again");
      return true;
    }

    let formData = new FormData();
    formData.append('email', Cookies.get("email"));


    const api = baseUrl() + "forgot_pass";

    axios
      .post(api, formData)
      .then((response) => {

        if (response.data.status === true) {
          CloseLoading();
          Cookies.set("token", response.data.token);
          alertBottom('OTP Sent', 'the OTP has been sent!, please check your email.')
          countdownTimer(2);
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

  const countdownTimer = (minutes) => {
    let totalSeconds = minutes * 60;

    const timer = setInterval(() => {
      const minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      seconds = seconds < 10 ? `0${seconds}` : seconds;

      if (timer != `${minutes}:${seconds}`) {
        setTimer(`${minutes}:${seconds}`);
      } else {
        setTimer("");
      }

      if (`${minutes}:${seconds}` == `0:00`) {
        setTimer("");
      }



      if (totalSeconds <= 0) {
        clearInterval(timer);
      } else {
        totalSeconds--;
      }
    }, 1000);
  }



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
                <div className="text-xl font-bold">Confirm OTP</div>
                <div className="text-xs">Enter otp code <data value=""></data></div>
              </div>

              <form className="w-full flex flex-col gap-5" onSubmit={register}>
                <div className="flex flex-col gap-2">

                  <div className="relative">
                    <input
                      className="pl-10 pr-4 rounded-lg appearance-none border-1 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:ring-0  focus:outline-none focus:bg-white focus:border-x focus:border-y  focus:border-black transition duration-300"
                      id="otp"
                      value={myObject.otp}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="OTP code"
                      required
                    />

                    <i className="bx bx-barcode absolute top-0 left-0 mt-3 ml-3 text-gray-500"></i>
                    <div className="absolute top-0 right-0 h-full flex items-center mr-3"> {timer}</div>
                  </div>


                  <div className="text-start text-xs">didn't receive the OTP code ?  <div
                    className="hover:text-blue-600 font-semibold hover:cursor-pointer"
                    onClick={() => forgotPass()}
                  >
                    click here
                  </div></div>
                </div>

                <div className="pt-5">
                  <button className="shadow bg-black hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-6 rounded-2xl w-auto hover:shadow-lg transition duration-300">
                    Check
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
