import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../images/image-from-rawpixel-id-5923662-jpeg.jpg";

const EditItem = () => {
  const navigate = useNavigate();
  const { index } = useParams();
  const [selectedItem, setSelectedItem] = useState("");

  const handleInputChange = (event) => {
    setSelectedItem(event.target.value);
  };

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem("todoList") || "[]");
    setSelectedItem(array[index]);
  }, []);

  const backTodoList = () => {
    navigate(`/index`);
  };

  const saveTask = () => {
    const newArrayList = JSON.parse(localStorage.getItem("todoList") || "[]");
    if (selectedItem) {
      newArrayList[index] = selectedItem;
      localStorage.setItem("todoList", JSON.stringify(newArrayList));
      backTodoList();
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <button
        className="bg-transparent hover:bg-white text-white text-sm font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded ml-5 mt-5"
        type="button"
        onClick={backTodoList}
      >
        ← Back
      </button>
      <div className="flex flex-row justify-center mt-14">
        <div className="p-10 bg-white rounded-3xl">
          <div className="flex flex-col">
            <h1 className="font-bold text-5xl text-gray-500 mb-10">
              TO DO:{" "}
              <span className="text-5xl text-gray-500 mb-5 underline italic">
                {`"${selectedItem}"`}
              </span>
            </h1>
            <p className="font-bold text-2xl text-gray-500 mb-2">
              Edit{" "}
              <span className="text-2xl text-gray-500 underline italic mb-2">
                {`"${selectedItem}"`}
              </span>{" "}
              of TO DO...
            </p>
          </div>
          <div className="flex flex-row">
            <input
              className="shadow appearance-none w-96 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={selectedItem}
              onChange={handleInputChange}
            />
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm w-20 h-10 rounded ml-8"
              type="button"
              onClick={saveTask}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
