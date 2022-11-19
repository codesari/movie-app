import React from "react";
import { ToastContainer } from "react-toastify";

import AuthContextProvider from "./context/AuthContextProvider";

import AppRouter from "./router/AppRouter";

const App = () => {
  // context kullandigimiz icin bu yapiyi contexin icine atiyoruz.burda yazmaya gerek kalmadi.
  // useEffect(() => {
  //   userObserver();
  // }, []);

  return (
    <div className="dark:bg-[#23242a]">
      <AuthContextProvider children={<AppRouter />} />
      <ToastContainer />
      {/* <AppRouter />
      </AuthContextProvider> */}
    </div>
  );
};

export default App;

//* AppRouter'ı Context'in child'ı olarak verdik.yorumdaki yazım ile aynı anlama geliyor
