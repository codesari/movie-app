import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../assets/img/not-found.png";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col m-auto gap-5 h-screen">
        <div className="flex justify-center">
          <img src={notFound} alt="" />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
