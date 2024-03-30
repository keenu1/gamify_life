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
    ShowLoading();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("id_section", id_section);
    console.log(id_section);
    console.log(name)
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
    loadData();
  }, []);


  return (
    <>
      <Navbar />
      <ModalInsert showModal={showModal} modalToggle={modalToggle} insertData={insertData}></ModalInsert>
      <ModalUpdate showModalUpdate={showModalUpdate} modalToggleUpdate={modalToggleUpdate} updateData={updateData} initialData={dataForUpdate} ></ModalUpdate>
      <ModalInsertSkill showModal={showModalSkill} modalToggle={modalSkillToggle} insertData={insertDataSkill} initialData={dataSkillForInsert}></ModalInsertSkill>
      <ModalDeleteSkill showModal={showModalSkillDelete} modalToggle={modalSkillToggleDelete} deleteData={deleteDataSkill} initialData={dataSkillForUpdate}></ModalDeleteSkill>
      <ModalUpdateSkill showModalUpdate={showModalSkillUpdate} modalToggleUpdate={modalSkillToggleUpdate} updateData={updateDataSkill} initialData={dataSkillForUpdate}></ModalUpdateSkill>
      <div className="mx-5 mt-5 flex items-center justify-end">
        <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={modalToggle}>
          Add New Section
        </button>
      </div>
      {currentData && currentData.map((item, index) => (
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
            {item.skill && item.skill.map((item2, index2) => (
              <div className="p-3 bg-white rounded-xl shadow-lg" key={index2}>
                <div className="flex justify-between items-center">
                  <div className="font-bold mb-3">{item2.name}</div>
                  <div>
                    <button type="button" className="bg-yellow-700 hover:bg-yellow-950 text-white font-bold py-2 px-4 rounded" onClick={() => editSkillRecord(item2)}>
                      I
                    </button>
                    <button type="button" className="bg-red-700 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => deleteSkillRecord(item2)}>X</button>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-52 min-h-52">
                  <div className="bg-gray-200 rounded-xl p-3 my-1">task 1</div>
                </div>
              </div>

            ))}
            <div> <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={() => addSkillRecord(item)}>
              Add New Skill
            </button></div>
          </div>
        </div>
      ))}

    </>
  );
}

export default Login;
