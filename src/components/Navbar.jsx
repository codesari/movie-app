import React, { useContext } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/avatar.png";
import { logOut } from "../auth/firebase";
import { AuthContext } from "../context/AuthContextProvider";
import Switch from "./Switch";

//! ÖNEMLİ HUSUS
//* navbar'a fixed-top özelligi verdik.her sayfada en üstte sabit görünsün diye.fakat navbar fixed old. zaman navbar'in altinda da bir alan oluşmuş oluyor.navbarin altina ekledigimiz sayfalar navbarin alt kismindan baslamis olacak.bunu engellemek icin navbar'in altina onun kapladigi kadar boş bir div verebilir ya da eklediğimiz her sayfa icin navbar kadar margin-top dememiz gerekir.

const Navbar = () => {
  //! useContext'in icine hangi context'i kullanacagimizi yaziyoruz..
  const { currentUser } = useContext(AuthContext);
  // const { currentUser } = useAuthContext();

  console.log("currentUser :>> ", currentUser);
  return (
    <>
      <nav className=" w-full flex flex-wrap items-center justify-between py-3 bg-red-700 text-white shadow-lg navbar navbar-expand-lg fixed-top">
        <div className="container-fluid w-full flex  items-center justify-between px-6">
          <Link className="text-2xl  pr-2 font-semibold" to="/">
            Movie Search Platform
          </Link>

          {/* Collapsible wrapper */}
          {/* Right elements */}
          <div className="flex items-center relative border-wid gap-2">
            {/* Icon */}
            {currentUser && (
              <h5 className="mr-2 ">
                {currentUser?.displayName || currentUser?.email}
              </h5>
            )}

            <div className="dropdown relative">
              <span
                className="dropdown-toggle flex items-center hidden-arrow"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={currentUser?.photoURL || avatar}
                  className="rounded-full"
                  style={{ height: 25, width: 25 }}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  //! güvenlik gerekçesi ile google'dan avatar cekilemedigi durumda bu satiri ekleyip düzeltiyoruz..
                />
              </span>
              <ul
                className="dropdown-menu min-w-max absolute  bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton2"
              >
                {!currentUser && (
                  <li>
                    <Link
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                )}

                {!currentUser && (
                  <li>
                    <Link
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li>
                    <span
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="#"
                      role="button"
                      onClick={() => logOut()}
                    >
                      Logout
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <Switch />
          </div>
          {/* Right elements */}
        </div>
      </nav>
      <div className="h-[52px]"></div>
    </>
  );
};

export default Navbar;

//* tailwind'ten aldigim navbar,full html kodlari old icin. html to jsx editörüyle jsx e cevirip buraya kopyaladim

//? register ve login sayfalari old.icin Link componenti kullanip yönlendirme yaptik.faakt logout sayfasi diye birsey olmadigi icin logout islemi icin onClick vereceğiz.bu yüzden link componenti yerine span kullandik.
