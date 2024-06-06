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
    catchErrorConnection,
    alertBottom
} from "../../assets/js/function";
import { useEffect, useState, Fragment, useRef, } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Cookies from "js-cookie";
import axios from "axios";
// import iziToast from "izitoast";

function Profil() {
    const [showMenu, setShowMenu] = useState(JSON.parse(localStorage.getItem('showMenu')));
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const [currentData, setcurrentData] = useState({
        rate: 0,
        comment: "",
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

        const api = baseUrl() + "feedback_insert";

        axios
            .post(api, formData, config)
            .then((response) => {

                console.log(response);
                if (response.data.status === true) {
                    alertBottom('Updated', response.data.message);
                    CloseLoading();
                }
                if (response.data.status === false) {
                    alertPopupError(response.data.message);
                }
            })
            .catch((error) => {
                catchErrorConnection(error);
                console.log(error);
            });
    };

    useEffect(() => {
        window.addEventListener('storage', () => {
            setShowMenu(JSON.parse(localStorage.getItem('showMenu')))
            // ...
        })


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

                        <div className="grid gap-6 mb-6 md:grid-cols-1 ">
                            <div >
                                <label
                                    htmlFor="first_name"
                                    className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Star
                                </label>
                                <i className={`bx ${currentData.rate >= 1 ? "bxs-star" : "bx-star"}  text-4xl`} onClick={() => setcurrentData({ ...currentData, rate: 1 })}></i>
                                <i className={`bx ${currentData.rate >= 2 ? "bxs-star" : "bx-star"}  text-4xl`} onClick={() => setcurrentData({ ...currentData, rate: 2 })}></i>
                                <i className={`bx ${currentData.rate >= 3 ? "bxs-star" : "bx-star"}  text-4xl`} onClick={() => setcurrentData({ ...currentData, rate: 3 })}></i>
                                <i className={`bx ${currentData.rate >= 4 ? "bxs-star" : "bx-star"}  text-4xl`} onClick={() => setcurrentData({ ...currentData, rate: 4 })}></i>
                                <i className={`bx ${currentData.rate >= 5 ? "bxs-star" : "bx-star"}  text-4xl`} onClick={() => setcurrentData({ ...currentData, rate: 5 })}></i>

                            </div>

                            <div >
                                <label
                                    htmlFor="first_name"
                                    className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Feedback
                                </label>
                                <textarea
                                    id="comment"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                                    placeholder="write your feedback"
                                    value={currentData.comment}
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







        </>
    );
}

export default Profil;
