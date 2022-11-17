import React, { useEffect } from "react";

import AuthContextProvider from "./context/AuthContextProvider";

import AppRouter from "./router/AppRouter";

const App = () => {
  // context kullandigimiz icin bu yapiyi contexin icine atiyoruz.burda yazmaya gerek kalmadi.
  // useEffect(() => {
  //   userObserver();
  // }, []);

  return (
    <div className="bg-[#23242a]">
      <AuthContextProvider children={<AppRouter />} />
      {/* <AppRouter />
      </AuthContextProvider> */}
    </div>
  );
};

export default App;

//* AppRouter'ı Context'in child'ı olarak verdik.yorumdaki yazım ile aynı anlama geliyor
