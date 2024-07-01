import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/image-from-rawpixel-id-5923662-jpeg.jpg";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (!inputValue) {
      return;
    } else {
      const arrayList = [...list, inputValue];

      localStorage.setItem("todoList", JSON.stringify(arrayList));
      setList(arrayList);
      setInputValue("");
    }
  };

  const deleteTask = (index) => {
    const arrayAfterDelete = list.filter(
      (_, taskIndex) => taskIndex !== index + pageSize * (page - 1)
    );
    localStorage.setItem("todoList", JSON.stringify(arrayAfterDelete));
    setList(arrayAfterDelete);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const defaultList = JSON.parse(localStorage.getItem("todoList") || "[]");
    setList(defaultList);
  }, []);

  const editTask = (index) => {
    console.log(index, pageSize, page);
    navigate(`/todo/${index + pageSize * (page - 1)}`);
  };

  return (
    <>
      {showAlert && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Task Deleted </strong>
          <span className="block sm:inline">the task has been deleted</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button className="font-bold" onClick={closeAlert}>
              X
            </button>
          </span>
        </div>
      )}

      <div className="flex flex-col items-center">
        <h1
          className="-mb-16 font-bold text-6xl text-white h-52 w-screen bg-cover bg-center flex flex-row justify-center items-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          TO DO List
        </h1>

        <div className="center h-full w-full mt-10 bg-white rounded-t-3xl">
          <div className="flex flex-col mt-10">
            <div className="flex flex-row justify-center">
              <p className="justify-center font-bold text-2xl text-gray-500 mr-5">
                Create To Do:
              </p>
              <input
                className=" w-2/5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Type a task..."
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm w-24 h-10 rounded ml-5"
                type="button"
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row justify-center">
              <p className="font-bold text-2xl text-gray-500 mt-14">
                Tasks List
              </p>
            </div>

            {list
              .slice(pageSize * (page - 1), page * pageSize)
              .map((item, index) => (
                <div key={index} className="flex flex-row justify-center">
                  <div className="bg-slate-200 flex items-center justify-between w-3/5 h-12 mb-2 rounded-md px-4">
                    {item}
                    <div className="flex flex-row">
                      <button
                        className="bg-violet-500 hover:bg-violet-600 text-white rounded-md w-12 h-8 text-xs font-bold ml-2"
                        type="button"
                        onClick={() => {
                          editTask(index);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full w-8 h-8 text-xs font-bold ml-2"
                        type="button"
                        onClick={() => deleteTask(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <span
                onClick={() => {
                  if (page > 1) {
                    setPage((prevState) => prevState - 1);
                  }
                }}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
                </svg>
              </span>

              {Array.from(Array(Math.ceil(list.length / pageSize)).keys()).map(
                (num, index) => {
                  return (
                    <span
                      key={`paginate-${index}`}
                      aria-current="page"
                      onClick={() => {
                        setPage(num + 1);
                      }}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:text-black hover:bg-indigo-600 focus:z-20 focus:outline-offset-0 ${
                        page === num + 1
                          ? "bg-indigo-500 text-white"
                          : "text-black"
                      }`}
                    >
                      {num + 1}
                    </span>
                  );
                }
              )}

              <span
                onClick={() => {
                  const maxPage = Math.ceil(list.length / pageSize);
                  if (page < maxPage) {
                    setPage((prevState) => prevState + 1);
                  }
                }}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
                </svg>
              </span>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
