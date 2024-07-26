import Link from "next/link";
import React, { useState, useContext } from "react";
import { Context } from "@/context/Context";

interface MenuProps {
  open: boolean;
  closeMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, closeMenu }) => {
  const { userId, setUserId, userRole, setUserRole, userToken, setUserToken } =
    useContext(Context);
  const [showSideBar, setShowSidebar] = useState(true);
  const activo =
    "absolute top-14 w-[50%] right-0 py-2 bg-[#FFCF91] transition-opacity duration-200";
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

    setUserId("");
    setUserRole("");
    setUserToken("");

    closeMenu(); 
  };

  return (
    <div className={`${open ? activo : inactivo} mt-0 ${userToken && "mt-[16px]"}`}>
      <ul className="flex flex-col mb-2 text-[14px] font-medium">
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

        {/* {userToken !== "" && newRole === "adminweb" && (
          <Link href={"/discounts"} onClick={handleLinkClick}>
            <li className="text-white hover:bg-[#FFCF91] hover:text-[#FD7B03] px-8 py-2">
              Mis descuentos
            </li>
          </Link>
        )}

        {userToken !== "" && newRole === "adminweb" && (
          <Link href={"/createDiscount"} onClick={handleLinkClick}>
            <li className="text-white hover:bg-[#FFCF91] hover:text-[#FD7B03] px-8 py-2">
              Crear descuento
            </li>
          </Link>
        )} */}

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
