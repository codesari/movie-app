import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../auth/firebase";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };
  const navigate = useNavigate();

  return (
    <div className="flex justify-items-center">
      <div className="form-image hidden md:block">
        <img
          src="https://picsum.photos/800/800"
          alt="sample-movie"
          className="object-cover h-screen w-full"
        />
      </div>
      <div className="overflow-hidden flex-1 h-screen justify-center items-center bg-[#23242a]">
        <div
          className={`mt-[3vh] mx-auto overflow-hidden relative w-[380px] h-[620px] rounded-[8px] bg-[#1c1c1c] before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%] custom-linear-gradient`}
        >
          <form
            className="absolute inset-[2px] rounded-[8px] bg-[#28292d] z-[10] form flex flex-col p-20"
            onSubmit={handleSubmit}
          >
            <h2 className="text-[#ff4b45] text-2xl font-[500] text-center tracking-[0.1em]">
              Reset Your Password
            </h2>

            <div className="relative w-[300px] mt-[35px] inputbox">
              <input
                type="email"
                required
                className="relative w-[100%] inputbox-input bg-transparent outline-none text-[#23242a] font-[1em] tracking-[0.05em]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute left-0 inputbox-span font-[1em] text-[#8f8f8f] tracking-[0.05em]">
                Email
              </span>
              <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#ff4b45] rounded-[4px]"></i>
            </div>
            <div className="flex">
              <input
                className="border-none outline-none bg-[#ff4b45] custom-input w-[100px] mt-[10px] rounded-[4px] font-[600] cursor-pointer"
                type="submit"
                value="Send"
              />
              <input
                className="border-none outline-none ml-2 text-white bg-[#080101] custom-input w-[100px] mt-[10px] rounded-[4px] font-[600] cursor-pointer"
                type="button"
                value="Back"
                onClick={() => navigate(-1)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
