import defaultImage from "../../assets/img/default.png";
import Navbar from "../../components/navbar";
import ModalInsert from "./modal_insert";
import ModalUpdate from "./modal_update";
import ModalInsertSkill from "./modal_insert_skill";
import ModalDeleteSkill from "./modal_delete_skill";
import ModalUpdateSkill from "./modal_update_skill";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, ShowLoading, CloseLoading, timeout, alertPopupError, alertBottom } from "../../assets/js/function";
import Cookies from "js-cookie";

function Login() {

  const [showMenu, setShowMenu] = useState(true);

  //data section 
  const [showModal, setShowModal] = useState(true);
  const [showModalUpdate, setShowModalUpdate] = useState(true);
  const [currentData, setCurrentData] = useState([
  ]);
  const [dataForUpdate, setDataForUpdate] = useState(null);

  // data skill
  const [showModalSkill, setShowModalSkill] = useState(true);
  const [showModalSkillUpdate, setShowModalSkillUpdate] = useState(true);
  const [showModalSkillDelete, setShowModalSkillDelete] = useState(true);
  const [currentDataSkill, setCurrentDataSkill] = useState([
  ]);
  const [dataSkillForUpdate, setDataSkillForUpdate] = useState(null);
  const [dataSkillForInsert, setDataSkillForInsert] = useState(null);

  //load data 
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
          console.log(currentData);
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

  //section
  const modalToggle = () => {
    setShowModal(!showModal);
  };
  const modalToggleUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const insertData = (name) => {
    if (name != "") {
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
    }
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

  //skill 

  //modal
  const modalSkillToggle = () => {
    setShowModalSkill(!showModalSkill);
  };
  const modalSkillToggleDelete = () => {
    setShowModalSkillDelete(!showModalSkillDelete);
  };
  const modalSkillToggleUpdate = () => {
    setShowModalSkillUpdate(!showModalSkillUpdate);
  };

  const addSkillRecord = (item) => {
    setDataSkillForInsert(item);
    modalSkillToggle();
  }
  const insertDataSkill = (id_section, name) => {
    console.log(id_section);
    console.log(name)
    ShowLoading();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("id_section", id_section);

    // Add your form data here

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "skill_insert";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {

          const newSkill = response.data.data;


          setCurrentData(prevData => {
            const index = prevData.findIndex(record => record.id === id_section);
            if (index !== -1) {
              if (prevData[index].skill == undefined) {
                prevData[index].skill = [];
              }
              prevData[index].skill.push(newSkill);

              return prevData;
            } else {

              return prevData;
            }
          });
          modalSkillToggle();
          alertBottom('Inserted', response.data.message);
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

  const editSkillRecord = (item) => {
    setDataSkillForUpdate(item);
    modalSkillToggleUpdate();
  }
  const updateDataSkill = (item) => {
    ShowLoading();
    let formData = new FormData();
    formData.append('id', item.id);
    formData.append('name', item.name);
    formData.append('id_section', item.id_section);

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "skill_update";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {
          console.log(response.data);
          setCurrentData(prevData => {
            const index = prevData.findIndex(record => record.id === item.id_section);
            if (index !== -1) {

              const index2 = prevData[index].skill.findIndex(record => record.id === item.id);
              prevData[index].skill[index2] = response.data.data;

              return prevData;
            } else {

              return prevData;
            }
          });
          alertBottom('Updated', response.data.message)
          modalSkillToggleUpdate();
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

  const deleteSkillRecord = (item) => {
    setDataSkillForUpdate(item);
    modalSkillToggleDelete();
  }
  const deleteDataSkill = (id_section, id) => {
    ShowLoading();
    let formData = new FormData();
    formData.append('id', id)

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "skill_delete";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {

          setCurrentData(prevData => {
            const index = prevData.findIndex(record => record.id === id_section);
            if (index !== -1) {

              const index2 = prevData[index].skill.findIndex(record => record.id === id);
              prevData[index].skill.splice(index2, 1);

              return prevData;
            } else {

              return prevData;
            }
          });
          alertBottom('Deleted', 'data section deleted')
          modalSkillToggleDelete();
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

  //load
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
        <div className={` transition-all ease-in-out duration-500 grow  min-h-screen  max-h-screen border p-5 rounded-xl shadow-lg mx-2  ${showMenu ? " " : ""}`}>

          <div className="  flex items-center justify-end mb-2">
            <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full flex items-center " onClick={modalToggle}>
              <i class='bx bx-plus me-2'></i> New Section
            </button>
          </div>
          <div className="overflow-scroll" style={{ height: '95%' }}>


            {currentData && currentData.map((item, index) => (
              <div className={`mt-2 rounded-xl px-2 pt-2 bg-gray-50 ${index === 0 ? 'mt-2' : 'mt-2'}`} key={index}>
                <div className="flex justify-between items-center bg-white p-2 rounded-xl mb-2">
                  <div className="mx-5 font-bold ">
                    {item.name}
                  </div>
                  <div className="flex gap-2" >
                    <button type="button" className="text-gray-700 hover:text-black bg-white px-2 py-1 font-bold rounded-xl" onClick={() => editRecord(item)}>
                      <i class='bx bxs-edit-alt'></i>
                    </button>
                    <button type="button" className="text-red-700 hover:text-red-800 bg-white px-2 py-1 font-bold rounded-xl" onClick={() => deleteData(item.id)}>
                      <i class='bx bxs-trash-alt' ></i>
                    </button>
                  </div>
                </div>
                <div className=" bg-gray-50 pb-2 rounded-xl grid grid-cols-4 gap-2">
                  {item.skill && item.skill.map((item2, index2) => (
                    <div className="p-3 bg-white rounded-xl shadow-lg" key={index2}>
                      <div className="flex justify-between items-center">
                        <div className="font-semibold mb-3">{item2.name}</div>
                        <div>
                          <button type="button" className="text-gray-700 hover:text-black bg-white px-2 py-1 font-bold rounded-xl" onClick={() => editSkillRecord(item2)}>
                            <i class='bx bxs-edit-alt'></i>
                          </button>
                          <button type="button" className="text-red-700 hover:text-red-800 bg-white px-2 py-1 font-bold rounded-xl" onClick={() => deleteSkillRecord(item2)}>
                            <i class='bx bxs-trash-alt' ></i>
                          </button>
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-52 min-h-52">
                        <div className="bg-gray-200 rounded-xl p-3 my-1">task 1</div>
                      </div>
                    </div>

                  ))}
                  <div>
                    <div className="p-3 bg-white rounded-xl shadow-lg h-full hover:cursor-pointer  opacity-50 hover:opacity-100 transition-all ease-in-out duration-300 " onClick={() => addSkillRecord(item)}>
                      <div className="flex items-center justify-center max-h-52 min-h-52">
                        <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full flex items-center justify-center " >
                          <i class='bx bx-plus me-2'></i> New Skill
                        </button>
                      </div>

                    </div>


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>




      </div >

      <ModalInsert showModal={showModal} modalToggle={modalToggle} insertData={insertData}></ModalInsert>
      <ModalUpdate showModalUpdate={showModalUpdate} modalToggleUpdate={modalToggleUpdate} updateData={updateData} initialData={dataForUpdate} ></ModalUpdate>
      <ModalInsertSkill showModal={showModalSkill} modalToggle={modalSkillToggle} insertData={insertDataSkill} initialData={dataSkillForInsert}></ModalInsertSkill>
      <ModalDeleteSkill showModal={showModalSkillDelete} modalToggle={modalSkillToggleDelete} deleteData={deleteDataSkill} initialData={dataSkillForUpdate}></ModalDeleteSkill>
      <ModalUpdateSkill showModalUpdate={showModalSkillUpdate} modalToggleUpdate={modalSkillToggleUpdate} updateData={updateDataSkill} initialData={dataSkillForUpdate}></ModalUpdateSkill>
    </>
  );
}

export default Login;
