import React, { createContext, useEffect, useState } from "react";
import { userObserver } from "../auth/firebase";

//? context olusturma
export const AuthContext = createContext();
//* bu context'i baska bir yerde kullanmak icin  useContext(AuthContext) seklinde yaziyoruz
//?  const {currentUser} = useContext(AuthContext);

//! with custom hook
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
  //? AuthContext.Provider 'daki AuthContext'i önce yukarida createContext() ile olusturduk sonra .Provider yaptik.
  //*currentUser'ı obje olarak gönderdik.tüm uygulamada kullanılabilir.(context).kullanirken de destruction yapilabilir..
};

export default AuthContextProvider;

//! context'i neredeyse her yerde kullanacagim,authentication old. icin (navbar da vs..).bu yüzden tüm yapiyi sarmallayacak sekilde contexti yazmaliyim.bu yüzden AppRouter'ı sarmalliyorum..
//*
