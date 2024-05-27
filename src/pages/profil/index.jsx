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
import { useEffect, useState, Fragment, useRef } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Cookies from "js-cookie";
import axios from "axios";
// import iziToast from "izitoast";

function Profil() {
  const [showMenu, setShowMenu] = useState(JSON.parse(localStorage.getItem('showMenu')));
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  const [currentData, setcurrentData] = useState({
    name: "",
    gender: "",
    dob: "",
    image: "",
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

    var input = document.getElementById('file_input');

    // Check if a file is selected

    if (input != null && input.files && input.files[0]) {
      var file = input.files[0]; // Get the file object
      formData.append('image', file); // A
    }

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
    window.addEventListener('storage', () => {
      setShowMenu(JSON.parse(localStorage.getItem('showMenu')))
      // ...
    })

    loadData();
  }, []);

  const Profile = {
    backgroundImage: 'url("' + currentData.image + '")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // Adjust as needed
  };

  return (
    <>

      <Navbar />
      <div className={`flex transition-all ease-in-out duration-500    ${showMenu ? "md:gap-11 lg:gap-2" : "md:gap-4 lg:gap-2"}`}>
        <div className={`  transition-all ease-in-out duration-500 ${showMenu ? "w-0 md:w-1/5" : "w-0 md:w-16"}`} ></div>
        <div className={` transition-all ease-in-out duration-500 grow  mt-5 border p-5 rounded-xl shadow-lg mx-2 ${showMenu ? " " : ""}`}>
          <form onSubmit={updateData}>
            <div className="grid gap-6 mb-6 md:grid-cols-4 ">
              <div className="flex justify-center ">
                <div className="  w-32 h-32  relative" >
                  <div className=" object-cover rounded-full w-full h-full " style={Profile}>

                  </div>

                  {/* <img
                    src={defaultImage}
                    alt=""
                    className="object-cover w-full h-full"
                  /> */}
                  <div className="absolute z-10 bg-black right-0 p-2 rounded-full bottom-0   text-white flex justify-start hover:cursor-pointer" onClick={() => setOpen(true)}>
                    <i className='bx bxs-pencil'></i>
                  </div>
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
                  Select Gender
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
                  className="text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </div>
            </div>





          </form>
        </div>
      </div>


      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={updateData}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Update your Image
                          </Dialog.Title>
                          <div className="mt-2  ">
                            {/* <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label> */}
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="ms-2 text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={() => setOpen(false)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>




    </>
  );
}

export default Profil;
