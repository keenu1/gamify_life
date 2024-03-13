import defaultImage from "../../assets/img/default.png";
import Navbar from "../../components/navbar";
import {
  baseUrl,
  useNavigation,
  timeout,
  currentDate,
  ShowLoading,
  CloseLoading,
  alertPopupError,
  alertBottom
} from "../../assets/js/function";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
// import iziToast from "izitoast";

function Profil() {
  const [currentData, setcurrentData] = useState({
    name: "",
    gender: "",
    dob: "",
  });
  const goPage = useNavigation();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    // console.log(id);
    // console.log(value);
    setcurrentData({
      ...currentData,
      [id]: value,
    });
  };

  const loadData = () => {
    ShowLoading();
    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };

    const api = baseUrl() + "profile";

    axios
      .post(api, "", config)
      .then((response) => {
        if (response.data.status === true) {
          const newData = { ...response.data.data[0] }; // Create a new object
          if (newData.dob === "0000-00-00") {
            newData.dob = currentDate();
          }
          setcurrentData(newData);
          CloseLoading();
        }
        if (response.data.status === false) {
          alertPopupError(response.data.message);
        }
      })
      .catch((error) => {
        alert("Mohon maaf terjadi kesalahan silahkan coba lagi ");
        console.log(error);
      });
  };

  const updateData = (event) => {
    event.preventDefault();
    ShowLoading();
    let formData = new FormData();

    Object.entries(currentData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };

    const api = baseUrl() + "profile_update";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {
          if (response.data.data[0].dob == "0000-00-00") {
            response.data.data[0].dob = currentDate();
          }
          setcurrentData(response.data.data[0]);
          alertBottom('Updated', response.data.message);
          CloseLoading();

          // alert(response.data.message);
        }
        if (response.data.status === false) {
          alertPopupError(response.data.message);
        }
      })
      .catch((error) => {
        alert("Mohon maaf terjadi kesalahan silahkan coba lagi ");
        console.log(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" mx-5 mt-5 border p-5 rounded-xl shadow-lg ">
        <form onSubmit={updateData}>
          <div className="grid gap-6 mb-6 md:grid-cols-4 ">
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-full w-32 h-32  ">
                <img
                  src={defaultImage}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                value={currentData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={currentData.gender}
                onChange={handleInputChange}
              >
                <option value="">Choose a Gender</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date Of Birthday
              </label>
              <input
                type="date"
                id="dob"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={currentData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end ">
            <div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profil;
