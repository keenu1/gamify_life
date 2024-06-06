
import Navbar from "../../components/navbar";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl, ShowLoading, CloseLoading, timeout, alertPopupError, alertBottom, catchErrorConnection } from "../../assets/js/function";
import Cookies from "js-cookie";



function Home() {

  const [showMenu, setShowMenu] = useState(JSON.parse(localStorage.getItem('showMenu')));
  const [currentData, setCurrentData] = useState([
  ]);
  const [currentDataProfile, setCurrentDataProfile] = useState({
    image: "", // Default base64 image string or URL
    // Add other default properties if needed
  });
  const loadData = () => {
    ShowLoading();
    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };

    const api = baseUrl() + "homes";

    axios
      .post(api, "", config)
      .then((response) => {
        if (response.data.status === true) {
          console.log(response.data);
          setCurrentDataProfile(response.data.data_profile);
          if (response.data.data != undefined) {
            setCurrentData(response.data.data);


          }


          CloseLoading();
        }
        if (response.data.status === false) {
          alertPopupError(response.data.message);
        }
      })
      .catch((error) => {
        catchErrorConnection(error);

      });
  };

  useEffect(() => {

    window.addEventListener('storage', () => {
      setShowMenu(JSON.parse(localStorage.getItem('showMenu')))
      // ...
    })

    loadData();


  }, []);
  return (
    <>
      <Navbar />
      <div className={`flex transition-all ease-in-out duration-500   ${showMenu ? "md:gap-11 lg:gap-2" : "md:gap-4 lg:gap-2"} `}>
        <div className={`  transition-all ease-in-out duration-500 ${showMenu ? "w-0 md:w-1/5" : "w-0 md:w-16"}`} ></div>
        <div className={` transition-all ease-in-out duration-500 grow min-h-screen  border p-0 lg:p-5 rounded-xl shadow-lg mx-2 mt-2 lg:mt-0  ${showMenu ? " " : ""}`}>
          <div className=" flex  justify-center items-center ">
            <div className="overflow-hidden rounded-full w-32 h-32 mt-5">
              <img
                src={`${currentDataProfile.image}`}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ms-5 ">
              <div className="font-bold">
                {currentDataProfile.name}
              </div>
              <div>
                {currentDataProfile.job}
              </div>
            </div>

          </div>
          <div className=" w-full  grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
            {currentData && currentData.map((item, index) => (
              <div className={`p-3 ${index == currentData.length - 1 ? "pb-20" : ""}`}>
                <div className="font-bold mb-3">{item.name}</div>
                <div>
                  {item.skill && item.skill.map((item2, index2) => (
                    <div className="mb-2">
                      <div className="flex  justify-between items-center">

                        <div>
                          {item2.name}
                        </div>
                        <div className="ms-2">
                          lvl. {item2.level}
                        </div>
                      </div>
                      <div className=" h-3 bg-gray-300 rounded-full">
                        <div className="bg-gray-500 h-3 rounded-full" style={{ width: `${item2.persentase}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
