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
    userStatus,
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
    setUserStatus
  } = useContext(Context);
  const [showSideBar, setShowSidebar] = useState(true);
  /* const [roleAdminWeb, setRoleAdminWeb] = useState<string | undefined>("");
  const [roleAdminApp, setRoleAdminApp] = useState<string | undefined>(""); */
  const [roleAppAdmin, setRoleAppAdmin] = useState<string | undefined>("");
  const [roleBusinessDirector, setRoleBusinessDirector] = useState<string | undefined>("");
  const [roleBusinessManager, setRoleBusinessManager] = useState<string | undefined>("");
  const [roleBusinessEmployee, setRoleBusinessEmployee] = useState<string | undefined>("");

  const router = useRouter();
  const currentRoute = usePathname(); // Obtener la ruta actual usando usePathname
  

  useEffect(() => {
    //Configuro una variable de estado p/cada rol y le adjudico el valor que dicho rol tiene en la variable de entorno.
    /* const appAdmin: string | undefined = process.env.NEXT_PUBLIC_ROLE_APP_ADMIN;
    setRoleAppAdmin(appAdmin);
  
    const businessDirector: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_DIRECTOR;
    setRoleBusinessDirector(businessDirector);

    const businessManager: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_MANAGER;
    setRoleBusinessManager(businessManager);

    const businessEmployee: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_EMPLOYEE;
    setRoleBusinessEmployee(businessEmployee); */
    setRoleAppAdmin("appAdmin");
    
    setRoleBusinessDirector("businessDirector");

    setRoleBusinessManager("businessManager");

    setRoleBusinessEmployee("businessEmployee");
  }, [setRoleAppAdmin, setRoleBusinessDirector, setRoleBusinessManager, setRoleBusinessEmployee]);

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
    Cookies.remove("userStatus");

    setUserRole("");
    setUserToken("");
    setUserName("");
    setBusinessName("");
    setBusinessType("");
    setUserStatus("");
    
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
      } ${!userToken ? "mt-[42px] xxs:mt-[9px] custom-w-450:mt-[21px]" : "mt-[42px] xxs:mt-[14px] custom-w-450:mt-[21px] md:mt-[22px]"} shadow-md shadow-gray-500`}
    >
      <div className="w-[100%] h-4 relative mb-2">
        <p className="absolute right-7 text-[15px] text-[black] font-semibold" onClick={handleLinkClick}>
          X
        </p>
      </div>
      <ul className="flex flex-col gap-2 mb-2 text-[15px]">
        <li
          className={`${
            currentRoute === "/"
            ? "text-[black] font-semibold bg-gray-100" // Estilo cuando está seleccionado
              : "text-[black] font-semibold hover:bg-[#FFCF91] hover:text-[black]"
          } py-2 px-8`}
        >
          <Link href={"/"} onClick={handleLinkClick}>
            Inicio
          </Link>
        </li>

        {userToken && (userRole === roleBusinessDirector || userRole === roleBusinessManager || userRole === roleBusinessEmployee) && userStatus === "active" && (
          <li
            className={`${
              currentRoute === "/dashboardBusinessAdmin"
                ? "text-[black] font-semibold bg-gray-100"
                : "text-[black] font-semibold hover:bg-[#FFCF91] hover:text-[black]"
            } px-8 py-2`}
          >
            <Link href={"/dashboardBusinessAdmin"} onClick={handleLinkClick}>
              Mi cuenta
            </Link>
          </li>
        )}

        {userToken  && userStatus === "pending" && (
          <li
            className={`${
              currentRoute === "/notifications"
              ? "text-[black] font-semibold bg-gray-100"
                : "text-[black] font-semibold hover:bg-[#FFCF91] hover:text-[black]"
            } px-8 py-2`}
          >
            <Link href={"/notifications"} onClick={handleLinkClick}>
              Notificaciones
            </Link>
          </li>
        )}

        {userToken && userRole === roleAppAdmin && (
          <li
            className={`${
              currentRoute === "/dashboardAppAdmin"
              ? "text-[black] font-semibold bg-gray-100"
                : "text-[black] font-semibold hover:bg-[#FFCF91] hover:text-[black]"
            } px-8 py-2`}
          >
            <Link href={"/dashboardAplicationAdmin"} onClick={handleLinkClick}>
              Mi cuenta
            </Link>
          </li>
        )}

        {userToken === "" && userRole === "" && (
          <li
            className={`${
              currentRoute === "/emailConfirm"
              ? "text-[black] font-semibold bg-gray-100"
                : "text-[black] font-semibold hover:bg-[#FFCF91] hover:text-[black]"
            } px-8 py-2`}
          >
            <Link href={"/emailConfirm"} onClick={handleLinkClick}>
              Crear cuenta
            </Link>
          </li>
        )}

        {userToken === "" && userRole === "" && (
          <li
            className={`${
              currentRoute === "/login"
              ? "text-[black] font-semibold bg-gray-100"
                : "text-[black] font-semibold hover:bg-[#FFCF91] hover:text-[black]"
            } px-8 py-2`}
          >
            <Link href={"/login"} onClick={handleLinkClick}>
              Iniciar sesión
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
