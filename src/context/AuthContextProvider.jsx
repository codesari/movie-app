import React, { createContext } from "react";

//? context olusturma
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

//* bir context olışturmak için 2 aşama var
//? 1- create context
//* 2- use it

//! context'i neredeyse her yerde kullanacagim,authentication old. icin (navbar da vs..).bu yüzden tüm yapiyi sarmallayacak sekilde contexti yazmaliyom.bu yüzden AppRouter'ı sarmalliyorum..
