import { useState } from "react";
import {
  useNavigation,
  baseUrl,
  alertPopupError,
} from "../../assets/js/function";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [myObject, setMyObject] = useState({
    username: "",
    password: "",
  });
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

    let formData = new FormData();

    Object.entries(myObject).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // this.token = Cookies.get("token_refresh");
    // this.config = {
    //     headers: { Authorization: `Bearer ` + this.token },
    //     timeout: 30000,
    // }

    const api = baseUrl() + "login";

    axios
      .post(api, formData)
      .then((response) => {
        if (response.data.status === true) {
          Cookies.set("token", response.data.data);
          GoPage("home");
        }
        if (response.data.status === false) {
          alertPopupError(response.data.message);
        }
      })
      .catch((error) => {
        alert("Mohon maaf terjadi kesalahan silahkan coba lagi ");
        console.log(error);
      });

    // GoPage("home");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <div className="px-6 py-4">
            <div className="font-bold text-xl  text-center mb-5">Login</div>
            <form className="w-full max-w-sm" onSubmit={signin}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Full Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="username"
                    value={myObject.username}
                    onChange={handleInputChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-password"
                  >
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="password"
                    type="password"
                    placeholder=""
                    value={myObject.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className=" items-center">
                <div className="text-center ">
                  <button
                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="px-6 pt-4 pb-2"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
