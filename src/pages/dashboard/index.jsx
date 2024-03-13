import defaultImage from "../../assets/img/default.png";
import Navbar from "../../components/navbar";
import ModalInsert from "./modal_insert";
import ModalUpdate from "./modal_update";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, ShowLoading, CloseLoading, timeout, alertPopupError, alertBottom } from "../../assets/js/function";
import Cookies from "js-cookie";

function Login() {
  const [showModal, setShowModal] = useState(true);
  const [showModalUpdate, setShowModalUpdate] = useState(true);
  const [currentData, setCurrentData] = useState([
  ]);
  const [dataForUpdate, setDataForUpdate] = useState(null);

  const modalToggle = () => {
    setShowModal(!showModal);
  };
  const modalToggleUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };
  const loadData = () => {
    ShowLoading();
    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };

    const api = baseUrl() + "sections";

    axios
      .post(api, "", config)
      .then((response) => {
        if (response.data.status === true) {

          setCurrentData(response.data.data.data_section);
          // console.log(response.data)


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
  const insertData = (name) => {
    ShowLoading();

    const formData = new FormData();
    formData.append("name", name);
    // Add your form data here

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "section_insert";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {
          // Get the newly added section object from the response
          const newSection = response.data.data;

          // Update the currentData array by adding the new section to the beginning
          setCurrentData(prevData => [newSection, ...prevData]);

          alertBottom('Inserted', 'data section inserted');
          CloseLoading();
        } else {
          alertPopupError(response.data.message);
        }
      })
      .catch((error) => {
        alert("Mohon maaf terjadi kesalahan silahkan coba lagi ");
        console.log(error);
      });
  };
  const deleteData = (id) => {
    ShowLoading();
    let formData = new FormData();
    formData.append('id', id)

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "section_delete";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {

          const updatedData = currentData.filter((record) => record.id !== id);
          setCurrentData(updatedData);
          alertBottom('Deleted', 'data section deleted')
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
  const updateData = (item) => {
    ShowLoading();
    const formData = new FormData();
    console.log(item);
    // Add the item properties to formData
    Object.entries(item).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "section_update";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {
          // Get the updated section object from the response
          const updatedSection = response.data.data;
          modalToggleUpdate();
          // Update the currentData array with the updated section
          setCurrentData(prevData => {
            // Find the index of the section with the same ID in the currentData array
            const index = prevData.findIndex(record => record.id === updatedSection.id);
            if (index !== -1) {
              // Create a new array with the updated section at the found index
              const newData = [...prevData];
              newData[index] = updatedSection;
              return newData;
            } else {
              // If section with the same ID is not found, return the previous data as is
              return prevData;
            }
          });

          CloseLoading();
        } else {
          alertPopupError(response.data.message);
        }
      })
      .catch((error) => {
        alert("Mohon maaf terjadi kesalahan silahkan coba lagi ");
        console.log(error);
      });
  };
  const editRecord = (item) => {
    setDataForUpdate(item);
    modalToggleUpdate();
  }



  useEffect(() => {
    loadData();
  }, []);


  return (
    <>
      <Navbar />
      <ModalInsert showModal={showModal} modalToggle={modalToggle} insertData={insertData}></ModalInsert>
      <ModalUpdate showModalUpdate={showModalUpdate} modalToggleUpdate={modalToggleUpdate} updateData={updateData} initialData={dataForUpdate} ></ModalUpdate>
      <div className="mx-5 mt-5 flex items-center justify-end">
        <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={modalToggle}>
          Add New Section
        </button>
      </div>
      {currentData && currentData.map((item, index) => (
        // <div key={index}>{item}</div>
        <div className="mx-5 mt-5 p-5 shadow-lg rounded-lg" key={index}>
          <div className="flex justify-between items-center">
            <div className="mx-5 font-bold">
              {item.name}
            </div>
            <div className="flex gap-2" >
              <button type="button" className="bg-yellow-700 hover:bg-yellow-950 text-white font-bold py-2 px-4 rounded" onClick={() => editRecord(item)}>
                Update
              </button>
              <button type="button" className="bg-red-700 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => deleteData(item.id)}>
                delete
              </button>
            </div>
          </div>
          <div className="mx-5 mt-5 bg-gray-50 p-5 rounded-xl grid grid-cols-4 gap-4">

            <div className="p-3 bg-white rounded-xl shadow-lg">
              <div className="font-bold mb-3">Title</div>
              <div className="overflow-y-auto max-h-52 min-h-52">
                <div className="bg-gray-200 rounded-xl p-3 my-1">task 1</div>
              </div>
            </div>
            {/* <div className="p-3 bg-white rounded-xl shadow-lg">
          <div className="font-bold mb-3">Title</div>
          <div className="overflow-y-auto max-h-52 min-h-52">
            <div className="bg-gray-200 rounded-xl p-3 my-1">task 1</div>
          </div>
        </div> */}
          </div>
        </div>
      ))}

    </>
  );
}

export default Login;
