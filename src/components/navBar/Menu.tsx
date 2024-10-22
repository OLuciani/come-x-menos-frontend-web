"use client";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation"; // Importar usePathname

interface MenuProps {
  open: boolean;
  closeMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, closeMenu }) => {
  const {
    userId,
    setUserId,
    userRole,
    setUserRole,
    userToken,
    setUserToken,
    setUserName,
    setBusinessName,
    setBusinessId,
    setBusinessType,
    setSelectedOption,
    setIsLoggedIn,
  } = useContext(Context);
  const [showSideBar, setShowSidebar] = useState(true);
  const [roleAdminWeb, setRoleAdminWeb] = useState<string | undefined>("");
  const [roleAdminApp, setRoleAdminApp] = useState<string | undefined>("");

  const router = useRouter();
  const currentRoute = usePathname(); // Obtener la ruta actual usando usePathname

  useEffect(() => {
    const roleAdminWeb: string | undefined = process.env.NEXT_PUBLIC_ROLE_ADMINWEB;
    setRoleAdminWeb(roleAdminWeb);

    const roleAdminApp: string | undefined = process.env.NEXT_PUBLIC_ROLE_ADMINAPP;
    setRoleAdminApp(roleAdminApp);
  }, [setRoleAdminApp, setRoleAdminWeb]);

  const activo =
    "absolute top-14 w-[60%] right-0 py-2 bg-[#FFCF91] p-2 transition-opacity duration-200 transition-opacity duration-200 z-50";
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

    Cookies.remove("userToken");
    Cookies.remove("token"); //Remueve la cookie con el token
    Cookies.remove("userRole");
    Cookies.remove("userName");
    Cookies.remove("businessName");
    Cookies.remove("businessType");

    setUserRole("");
    setUserToken("");
    setUserName("");
    setBusinessName("");
    setBusinessType("");
    
    setIsLoggedIn(false);

    //setUserMenuOpen(false); 

    setTimeout(() => {
      router.push("/login");
      setSelectedOption("Iniciar sesión");
    }, 1000); //Si no le doy 1 segundo con el setTimeout no funciona bien .

    closeMenu();
  };

  return (
    <div
      className={`${
        open ? activo : inactivo
      } ${!userToken ? "mt-[9px] custom-w-450:mt-[21px]" : "mt-[14px] custom-w-450:mt-[21px]"}`}
    >
      <div className="w-[100%] h-4 relative mb-2">
        <p className="absolute right-7 text-[15px] text-[#FD7B03] font-bold" onClick={handleLinkClick}>
          X
        </p>
      </div>
      <ul className="flex flex-col gap-2 mb-2 text-[15px] font-medium">
        <Link href={"/"} onClick={handleLinkClick}>
          <li
            className={`${
              currentRoute === "/"
              ? "text-[#FD7B03] font-bold bg-white" // Estilo cuando está seleccionado
                : "text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03]"
            } py-2 px-8`}
          >
            Inicio
          </li>
        </Link>

        {userToken && userRole === roleAdminWeb && (
          <Link href={"/dashboardBusinessAdmin"} onClick={handleLinkClick}>
            <li
              className={`${
                currentRoute === "/dashboardBusinessAdmin"
                  ? "text-[#FD7B03] font-bold bg-white"
                  : "text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03]"
              } px-8 py-2`}
            >
              Mi cuenta
            </li>
          </Link>
        )}

        {userToken && userRole === roleAdminApp && (
          <Link href={"/dashboardAplicationAdmin"} onClick={handleLinkClick}>
            <li
              className={`${
                currentRoute === "/dashboardAppAdmin"
                ? "text-[#FD7B03] font-bold bg-white"
                  : "text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03]"
              } px-8 py-2`}
            >
              Mi cuenta
            </li>
          </Link>
        )}

        {userToken === "" && userRole === "" && (
          <Link href={"/emailConfirm"} onClick={handleLinkClick}>
            <li
              className={`${
                currentRoute === "/emailConfirm"
                ? "text-[#FD7B03] font-bold bg-white"
                  : "text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03]"
              } px-8 py-2`}
            >
              Crear cuenta
            </li>
          </Link>
        )}

        {userToken === "" && userRole === "" && (
          <Link href={"/login"} onClick={handleLinkClick}>
            <li
              className={`${
                currentRoute === "/login"
                ? "text-[#FD7B03] font-bold bg-white"
                  : "text-[#FD7B03] font-bold hover:bg-[#FFCF91] hover:text-[#FD7B03]"
              } px-8 py-2`}
            >
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
