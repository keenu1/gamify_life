import { useState } from "react";
import {
  useNavigation,
  baseUrl,
  alertPopupError,
  catchErrorConnection,
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
      <div className=" h-screen bg-black p-10 ">
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
                </div>

                <div>
                  <button className="shadow bg-black hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-6 rounded-2xl w-auto hover:shadow-lg transition duration-300">
                    Login
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
