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
      <div className="w-[100%] h-4 relative mb-5">
        <p className="absolute px-1 right-0 hover:bg-gray-100 text-[18px] text-[#FD7B03] font-semibold hover:border-[#FD7B03] rounded" onClick={handleLinkClick}>
          X
        </p>
      </div>
      <ul className="flex flex-col gap-2 mb-2 text-[18px] font-semibold">
        <li
          className={`${
            currentRoute === "/"
            ? "bg-[#FD7B03] text-[white]" // Estilo cuando está seleccionado
              : "bg-gray-100 text-[#FD7B03] hover:bg-[#FD7B03] hover:text-gray-100"
          } py-2 px-8`}
          onClick={handleLinkClick}
        >
          <Link href={"/"}>
            <p>Inicio</p>
          </Link>
        </li>

        {userToken && (userRole === roleBusinessDirector || userRole === roleBusinessManager || userRole === roleBusinessEmployee) && userStatus === "active" && (
          <li
            className={`${
              currentRoute === "/dashboardBusinessAdmin"
              ? "bg-[#FD7B03] text-[white]" // Estilo cuando está seleccionado
                : "bg-gray-100 text-[#FD7B03] hover:bg-[#FD7B03] hover:text-gray-100"
            } py-2 px-8`}
            onClick={handleLinkClick}
          >
            <Link href={"/dashboardBusinessAdmin"}>
              <p>Mi cuenta</p>
            </Link>
          </li>
        )}

        {userToken  && userStatus === "pending" && (
          <li
            className={`${
              currentRoute === "/notifications"
              ? "bg-[#FD7B03] text-[white]" // Estilo cuando está seleccionado
                : "bg-gray-100 text-[#FD7B03] hover:bg-[#FD7B03] hover:text-gray-100"
            } py-2 px-8`}
            onClick={handleLinkClick}
          >
            <Link href={"/notifications"} >
              <p>Notificaciones</p>
            </Link>
          </li>
        )}

        {userToken && userRole === roleAppAdmin && (
          <li
            className={`${
              currentRoute === "/dashboardAplicationAdmin"
              ? "bg-[#FD7B03] text-[white]" // Estilo cuando está seleccionado
                : "bg-gray-100 text-[#FD7B03] hover:bg-[#FD7B03] hover:text-gray-100"
            } py-2 px-8`}
            onClick={handleLinkClick}
          >
            <Link href={"/dashboardAplicationAdmin"} >
              <p>Mi cuenta</p>
            </Link>
          </li>
        )}

        {userToken === "" && userRole === "" && (
          <li
            className={`${
              currentRoute === "/emailConfirm"
              ? "bg-[#FD7B03] text-[white]" // Estilo cuando está seleccionado
                : "bg-gray-100 text-[#FD7B03] hover:bg-[#FD7B03] hover:text-gray-100"
            } py-2 px-8`}
            onClick={handleLinkClick}
          >
            <Link href={"/emailConfirm"}>
              <p>Crear cuenta</p>
            </Link>
          </li>
        )}

        {userToken === "" && userRole === "" && (
          <li
            className={`${
              currentRoute === "/login"
              ? "bg-[#FD7B03] text-[white]" // Estilo cuando está seleccionado
                : "bg-gray-100 text-[#FD7B03] hover:bg-[#FD7B03] hover:text-gray-100"
            } py-2 px-8`}
            onClick={handleLinkClick}
          >
            <Link href={"/login"}>
              <p>Iniciar sesión</p>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
