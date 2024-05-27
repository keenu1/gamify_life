import defaultImage from "../../assets/img/default.png";
import Navbar from "../../components/navbar";
import ModalInsert from "./modal_insert";
import ModalUpdate from "./modal_update";
import ModalDelete from "./modal_delete";
import ModalInsertSkill from "./modal_insert_skill";
import ModalDeleteSkill from "./modal_delete_skill";
import ModalUpdateSkill from "./modal_update_skill";
import ModalInsertTask from "./modal_insert_task";
import ModalDeleteTask from "./modal_delete_task";
import ModalUpdateTask from "./modal_update_task";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl, ShowLoading, CloseLoading, timeout, alertPopupError, alertBottom } from "../../assets/js/function";
import Cookies from "js-cookie";

function Login() {

  const [showMenu, setShowMenu] = useState(JSON.parse(localStorage.getItem('showMenu')));
  // const [isEditing, setIsEditing] = useState(false);
  // const [editingIndex, setEditingIndex] = useState(null);

  //data section 
  const [showModal, setShowModal] = useState(true);
  const [showModalUpdate, setShowModalUpdate] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(true);
  const [currentData, setCurrentData] = useState([
  ]);
  const [dataForUpdate, setDataForUpdate] = useState(null);
  const [dataForDelete, setDataForDelete] = useState(null);

  // data skill
  const [showModalSkill, setShowModalSkill] = useState(true);
  const [showModalSkillUpdate, setShowModalSkillUpdate] = useState(true);
  const [showModalSkillDelete, setShowModalSkillDelete] = useState(true);
  const [currentDataSkill, setCurrentDataSkill] = useState([
  ]);
  const [dataSkillForUpdate, setDataSkillForUpdate] = useState(null);
  const [dataSkillForInsert, setDataSkillForInsert] = useState(null);

  // data task
  const [showModalTask, setShowModalTask] = useState(true);
  const [showModalTaskUpdate, setShowModalTaskUpdate] = useState(true);
  const [showModalTaskDelete, setShowModalTaskDelete] = useState(true);
  const [currentDataTask, setCurrentDataTask] = useState([
  ]);
  const [dataTaskForUpdate, setDataTaskForUpdate] = useState(null);
  const [dataTaskForInsert, setDataTaskForInsert] = useState(null);

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
  const modalToggleDelete = () => {
    setShowModalDelete(!showModalDelete);
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
  const deleteData = (item) => {
    ShowLoading();
    let formData = new FormData();
    formData.append('id', item.id)

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "section_delete";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {
          modalToggleDelete();
          const updatedData = currentData.filter((record) => record.id !== item.id);
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
              newData[index].name = updatedSection.name;
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
  const deleteRecord = (item) => {
    setDataForDelete(item);
    modalToggleDelete();
  }

  //skill 

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
  const insertDataSkill = (id_section, item) => {
    ShowLoading();

    const formData = new FormData();

    Object.entries(item).forEach(([key, value]) => {
      formData.append(key, value);
    });
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
    Object.entries(item).forEach(([key, value]) => {
      formData.append(key, value);
    });
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

  // //task 

  const modalTaskToggle = () => {
    setShowModalTask(!showModalTask);
  };
  const modalTaskToggleDelete = () => {
    setShowModalTaskDelete(!showModalTaskDelete);
  };
  const modalTaskToggleUpdate = () => {
    setShowModalTaskUpdate(!showModalTaskUpdate);
  };

  const addTaskRecord = (item) => {
    setDataTaskForInsert(item);
    modalTaskToggle();
  }
  const insertDataTask = (id_section, id_skill, item) => {

    ShowLoading();


    const formData = new FormData();
    Object.entries(item).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('id_skill', id_skill);


    // Add your form data here

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "task_insert";

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
              const index2 = prevData[index].skill.findIndex(record => record.id === id_skill);
              if (prevData[index].skill[index2].task == undefined) {
                prevData[index].skill[index2].task = [];
              }
              prevData[index].skill[index2].task.push(newSkill);

              return prevData;
            } else {

              return prevData;
            }
          });
          modalTaskToggle();
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

  const editTaskRecord = (item) => {
    setDataTaskForUpdate(item);

    modalTaskToggleUpdate();
  }
  const updateDataTask = (item) => {
    ShowLoading();
    let formData = new FormData();
    Object.entries(item).forEach(([key, value]) => {
      formData.append(key, value);
    });





    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "task_update";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {

          setCurrentData(prevData => {
            const index = prevData.findIndex(record => record.id === item.id_section);
            if (index !== -1) {

              const index2 = prevData[index].skill.findIndex(record => record.id === item.id_skill);
              const index3 = prevData[index].skill[index2].task.findIndex(record => record.id === item.id);
              prevData[index].skill[index2].task[index3] = response.data.data;
              prevData[index].skill[index2].task[index3].id_section = item.id_section;

              return prevData;
            } else {

              return prevData;
            }
          });
          alertBottom('Updated', response.data.message)
          modalTaskToggleUpdate();
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

  const deleteTaskRecord = (item) => {
    setDataTaskForUpdate(item);
    modalTaskToggleDelete();
  }
  const deleteDataTask = (item) => {
    ShowLoading();
    let formData = new FormData();
    formData.append('id', item.id)

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "task_delete";

    axios
      .post(api, formData, config)
      .then((response) => {
        if (response.data.status === true) {

          setCurrentData(prevData => {
            const index = prevData.findIndex(record => record.id === item.id_section);
            if (index !== -1) {

              const index2 = prevData[index].skill.findIndex(record => record.id === item.id_skill);
              const index3 = prevData[index].skill[index2].task.findIndex(record => record.id === item.id);
              prevData[index].skill[index2].task.splice(index3, 1);

              return prevData;
            } else {

              return prevData;
            }
          });
          alertBottom('Deleted', response.data.message)
          modalTaskToggleDelete();
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

  const completeRecord = (item) => {
    ShowLoading();

    let formData = new FormData();
    Object.entries(item).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('status_complete', 'SUCCESS');

    const config = {
      headers: { Authorization: `Bearer ` + Cookies.get("token") },
      timeout: timeout(),
    };
    const api = baseUrl() + "task_update";

    axios
      .post(api, formData, config)
      .then((response) => {

        if (response.data.status === true) {

          setCurrentData(prevData => {
            const index = prevData.findIndex(record => record.id === item.id_section);

            if (index !== -1) {

              const index2 = prevData[index].skill.findIndex(record => record.id === item.id_skill);
              const item_skill = prevData[index].skill[index2];

              const index3 = prevData[index].skill[index2].task.findIndex(record => record.id === item.id);

              const item_task = prevData[index].skill[index2].task[index3];

              const jumlah = parseInt(item_skill.progress) + parseInt(item_task.score);

              const selisih = (parseInt(item_skill.limit_progress) - jumlah) * -1;
              let level_loncat = 0;


              item_skill.progress = jumlah;
              if (!(jumlah < parseInt(item_skill.limit_progress))) {

                if (selisih >= parseInt(item_skill.limit_progress)) {
                  const sisabagi = selisih % parseInt(item_skill.limit_progress);

                  if (sisabagi == 0) {
                    level_loncat = selisih / parseInt(item_skill.limit_progress);

                    item_skill.level = parseInt(item_skill.level) + level_loncat + 1;
                    item_skill.progress = 0;
                  } else {
                    const progress = selisih - sisabagi;
                    level_loncat = progress / parseInt(item_skill.limit_progress);
                    item_skill.level = parseInt(item_skill.level) + level_loncat + 1;
                    item_skill.progress = sisabagi;
                  }


                } else {
                  item_skill.level = parseInt(item_skill.level) + 1;
                  item_skill.progress = selisih;
                }
              }


              prevData[index].skill[index2].task.splice(index3, 1);

              return prevData;
            } else {

              return prevData;
            }
          });
          alertBottom('Completed', response.data.message)
          setDataTaskForUpdate(item);
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

  // const editTask = (sectionId, skillId, taskIndex, updatedTask) => {
  //   setCurrentData((prevData) => {
  //     return prevData.map((section) => {
  //       if (section.id === sectionId) {
  //         return {
  //           ...section,
  //           skill: section.skill.map((skill) => {
  //             if (skill.id === skillId) {
  //               return {
  //                 ...skill,
  //                 task: skill.task.map((task, index) => {
  //                   if (index === taskIndex) {
  //                     return updatedTask;
  //                   }
  //                   return task;
  //                 }),
  //               };
  //             }
  //             return skill;
  //           }),
  //         };
  //       }
  //       return section;
  //     });
  //   });
  // };


  //load
  useEffect(() => {

    window.addEventListener('storage', () => {
      setShowMenu(JSON.parse(localStorage.getItem('showMenu')))
      // ...
    })

    loadData();

    const handleClickOutside = (event) => {

      //   // if (!event.target.closest('.edit-container')) {
      //   //   setEditingIndex(null);
      //   // }
    };

    // document.addEventListener('mousedown', handleClickOutside);
    // return () => document.removeEventListener('mousedown', handleClickOutside);


  }, []);



  return (
    <>



      <Navbar />

      <div className={`flex transition-all ease-in-out duration-500   ${showMenu ? "md:gap-11 lg:gap-2" : "md:gap-4 lg:gap-2"} `}>
        <div className={`  transition-all ease-in-out duration-500 ${showMenu ? "w-0 md:w-1/5" : "w-0 md:w-16"}`} ></div>
        <div className={` transition-all ease-in-out duration-500 grow  min-h-screen  max-h-screen border p-5 rounded-xl shadow-lg mx-2  ${showMenu ? " " : ""}`}>

          <div className="  flex items-center justify-end mb-2">
            <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full flex items-center " onClick={modalToggle}>
              <i className='bx bx-plus me-2'></i> New Section
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
                      <i className='bx bxs-edit-alt'></i>
                    </button>
                    <button type="button" className="text-red-700 hover:text-red-800 bg-white px-2 py-1 font-bold rounded-xl" onClick={() => deleteRecord(item)}>
                      <i className='bx bxs-trash-alt' ></i>
                    </button>
                  </div>
                </div>
                <div className=" bg-gray-50 pb-2 rounded-xl grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
                  {item.skill && item.skill.map((item2, index2) => (
                    <div className="p-3 bg-white rounded-xl shadow-lg" key={index2}>
                      <div className="flex justify-between items-start">
                        <div className="font-semibold flex items-center justify-between flex-grow">
                          <div>{item2.name}</div>
                          <div className="text-gray-400 me-2">lvl {item2.level}</div>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" className="text-gray-700 hover:text-black  font-bold rounded-xl" onClick={() => addTaskRecord(item2)}>
                            <i className='bx bx-plus'></i>
                          </button>

                          <button type="button" className="text-gray-700 hover:text-black  font-bold rounded-xl" onClick={() => editSkillRecord(item2)}>
                            <i className='bx bxs-edit-alt'></i>
                          </button>
                          <button type="button" className="text-red-700 hover:text-red-800 font-bold rounded-xl" onClick={() => deleteSkillRecord(item2)}>
                            <i className='bx bxs-trash-alt' ></i>
                          </button>
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-52 min-h-52 ">
                        {item2.task && item2.task.map((item3, index3) => (
                          <div className="bg-gray-200 rounded-xl p-3 my-1 flex justify-between" key={index3}>
                            <div className="flex justify-between items-center flex-grow">
                              <div >{item3.name}</div>
                              <div className="font-semibold me-2 text-gray-500">{item3.score}</div>
                            </div>
                            <div className="flex gap-2">
                              <button type="button" className="text-blue-700 hover:text-blue-800 font-bold rounded-xl" onClick={() => completeRecord(item3)}>
                                <i className='bx bx-check'></i>
                              </button>
                              <button type="button" className="text-gray-700 hover:text-black  font-bold rounded-xl" onClick={() => editTaskRecord(item3)}>
                                <i className='bx bxs-edit-alt'></i>
                              </button>
                              <button type="button" className="text-red-700 hover:text-red-800 font-bold rounded-xl" onClick={() => deleteTaskRecord(item3)}>
                                <i className='bx bxs-trash-alt' ></i>
                              </button>

                            </div>

                          </div>
                        ))}
                        <div className="bg-gray-200 rounded-xl p-3 my-1 opacity-40 hover:opacity-90 hover:cursor-pointer w-full flex items-center justify-center" onClick={() => addTaskRecord(item2)} ><i className='bx bx-plus me-2'></i></div>

                      </div>
                    </div>

                  ))}
                  <div>
                    <div className="p-3 bg-white rounded-xl shadow-lg h-full hover:cursor-pointer  opacity-50 hover:opacity-100 transition-all ease-in-out duration-300 " onClick={() => addSkillRecord(item)}>
                      <div className="flex items-center justify-center max-h-52 min-h-52">
                        <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full flex items-center justify-center " >
                          <i className='bx bx-plus me-2'></i> New Skill
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
      <ModalDelete showModalDelete={showModalDelete} modalToggleDelete={modalToggleDelete} deleteData={deleteData} initialData={dataForDelete} ></ModalDelete>
      <ModalInsertSkill showModal={showModalSkill} modalToggle={modalSkillToggle} insertData={insertDataSkill} initialData={dataSkillForInsert}></ModalInsertSkill>
      <ModalDeleteSkill showModal={showModalSkillDelete} modalToggle={modalSkillToggleDelete} deleteData={deleteDataSkill} initialData={dataSkillForUpdate}></ModalDeleteSkill>
      <ModalUpdateSkill showModalUpdate={showModalSkillUpdate} modalToggleUpdate={modalSkillToggleUpdate} updateData={updateDataSkill} initialData={dataSkillForUpdate}></ModalUpdateSkill>
      <ModalInsertTask showModal={showModalTask} modalToggle={modalTaskToggle} insertData={insertDataTask} initialData={dataTaskForInsert}></ModalInsertTask>
      <ModalDeleteTask showModal={showModalTaskDelete} modalToggle={modalTaskToggleDelete} deleteData={deleteDataTask} initialData={dataTaskForUpdate}></ModalDeleteTask>
      <ModalUpdateTask showModalUpdate={showModalTaskUpdate} modalToggleUpdate={modalTaskToggleUpdate} updateData={updateDataTask} initialData={dataTaskForUpdate}></ModalUpdateTask>
    </>
  );
}

export default Login;
