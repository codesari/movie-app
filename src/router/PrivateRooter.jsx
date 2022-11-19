import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const PrivateRooter = () => {
  const { currentUser } = useContext(AuthContext);
  return <>{currentUser ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default PrivateRooter;

//? Navigate'deki replace historyde bir önceki sayfaya gidebilmeyi sağlar
