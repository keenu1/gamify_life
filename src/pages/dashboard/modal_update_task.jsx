import React, { useState, useEffect } from "react";

function Modal({ showModalUpdate, modalToggleUpdate, updateData, initialData }) {
    const [currentData, setCurrentData] = useState({});

    // Reset currentData whenever showModalUpdate changes
    useEffect(() => {
        if (!showModalUpdate && initialData) {
            setCurrentData(initialData);
        } else {
            setCurrentData({});
        }
    }, [showModalUpdate, initialData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <form onSubmit={(event) => { event.preventDefault(); updateData(currentData) }}>
                <div className={`relative z-10 ${showModalUpdate ? "ease-out opacity-0 duration-200 pointer-events-none " : "ease-in opacity-100 duration-300"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${showModalUpdate ? "ease-in duration-200 opacity-0 translate-y-0 sm:translate-y-0 sm:scale-95" : "ease-out duration-300 opacity-100 translate-y-4 sm:scale-100"}`}>
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(0,0,0,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left  w-full">
                                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                                Update Task
                                            </h3>
                                            <div className="mt-2 w-full">
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                                                        placeholder="New Task"
                                                        value={currentData.name || ''}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-2 w-full">
                                                <div>
                                                    <label
                                                        htmlFor="score"
                                                        className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Score
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="score"
                                                        name="score"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                                                        placeholder="0"
                                                        value={currentData.score || ''}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black sm:ml-3 sm:w-auto"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={modalToggleUpdate}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Modal;
