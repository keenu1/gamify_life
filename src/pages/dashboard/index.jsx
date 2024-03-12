import defaultImage from "../../assets/img/default.png";
import Navbar from "../../components/navbar";
import Modal from "./modal";
import { React, useState } from "react";

function Login() {
  const [showModal, setShowModal] = useState(true);

  const modalToggle = () => {
    setShowModal(!showModal);

  };

  return (
    <>
      <Navbar />
      <Modal showModal={showModal} modalToggle={modalToggle}></Modal>
      <div className="mx-5 mt-5 flex items-center justify-end">
        <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={modalToggle}>
          Add New Section
        </button>
      </div>
      <div className="mx-5 mt-5 bg-gray-50 p-5 rounded-xl grid grid-cols-4 gap-4">
        <div className="p-3 bg-white rounded-xl shadow-lg">
          <div className="font-bold mb-3">Title</div>
          <div className="overflow-y-auto max-h-52 min-h-52">
            <div className="bg-gray-200 rounded-xl p-3 my-1">task 1</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
