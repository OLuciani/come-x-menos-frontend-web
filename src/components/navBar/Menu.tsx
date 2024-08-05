import Link from "next/link";
import React, { useState, useContext } from "react";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";

interface MenuProps {
  open: boolean;
  closeMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, closeMenu }) => {
  const { userId, setUserId, userRole, setUserRole, userToken, setUserToken, setUserName, setBusinessName, setBusinessId, setBusinessType } =
    useContext(Context);
  const [showSideBar, setShowSidebar] = useState(true);
  const activo =
    "absolute top-14 w-[50%] right-0 py-2 bg-[#FFCF91] transition-opacity duration-200 transition-opacity duration-200 z-50";
  const inactivo =
    "absolute top-14 w-screen left-0  py-2 bg-[#FFCF91] opacity-0 transition-opacity duration-200 -z-50";

  const handleOnClick = () => {
    setShowSidebar(false);
  };

  const handleLinkClick = () => {
    closeMenu(); // Cierra el menú al hacer clic en un enlace
  };


  let handleLogOutUser = () => {
    console.log("Cerrar sesión");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("_id");

    Cookies.remove("userToken");
    Cookies.remove("userRole");
    /* Cookies.remove("userId");
    Cookies.remove("userName");
    Cookies.remove("businessName");
    Cookies.remove("businessId");
    Cookies.remove("businessType"); */

    setUserToken("");
    setUserRole("");
    setUserId("");
    /* setUserName("");
    setBusinessName("");
    setBusinessId("");
    setBusinessType(""); */

    closeMenu(); 
  };

  return (
    <div className={`${open ? activo : inactivo} ${!userToken ? "mt-[9px] custom-w-450:mt-[21px]": "mt-[14px] custom-w-450:mt-[21px]"} `}>
      <div className="w-[100%] h-4 relative">
        <p className="absolute right-7 text-[15px] text-[#FD7B03] font-bold" onClick={handleLinkClick}>X</p>
      </div>
      <ul className="flex flex-col mb-2 text-[15px] font-medium">
        <Link href={"/"} onClick={handleLinkClick}>
          <li className="text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03] py-2 px-8">
            Inicio
          </li>
        </Link>

        {userToken !== "" && userRole === "adminweb" && (
          <Link href={"/myAccount"} onClick={handleLinkClick}>
            <li className="text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03] px-8 py-2">
              Mi cuenta
            </li>
          </Link>
        )}


        {userToken === "" && userRole === "" && (
          <Link href={"/register"} onClick={handleLinkClick}>
            <li className="text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03] px-8 py-2">
              Crear cuenta
            </li>
          </Link>
        )}

        {userToken === "" && userRole === "" && (
          <Link href={"/login"} onClick={handleLinkClick}>
            <li className="text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03] px-8 py-2">
              Iniciar sesión
            </li>
          </Link>
        )}

        {userToken !== "" && userRole !== "" && (
          <Link href={"/"}>
            <li
              className={`text-[#FD7B03] font-bold px-8 py-2 cursor-pointer`}
              onClick={() => {
                console.log("<Cerrar sesión>");
                handleLogOutUser();
              }}
            >
              Cerrar sesión
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Menu;



