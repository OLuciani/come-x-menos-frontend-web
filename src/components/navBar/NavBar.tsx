"use client"
import React, { useState, useEffect, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Menu from "./Menu";
import { Krona_One } from "next/font/google";
import Link from "next/link";
//import { useRouter } from "next/router"; // Importar useRouter directamente
import { Context } from "@/context/Context";
import { FiUser } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  const {
    userId,
    setUserId,
    userRole,
    setUserRole,
    //userToken,
    //setUserToken,
    userName,
    setUserName,
    backgroundButtonNavBar,
    selectedOption,
    setSelectedOption,
    userToken,
    setUserToken,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const router = useRouter();

  //const [userToken, setUserToken] = useState<string>("");
  //const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    if (isLoggedIn) {
      const storedToken = Cookies.get("userToken") || "";
      console.log("Valor de storedToken: ", storedToken);

      //const storedRole = Cookies.get("userRole") || "";
      //console.log("Valor de storedRole: ", storedRole);

      setUserToken(storedToken);
      //setUserRole(storedRole);
      //Cookies.remove("token");
      //Cookies.remove("role");
    }
  }, [isLoggedIn, setUserToken]); // Solo se ejecuta una vez cuando el componente se monta y está iniciada la sesión de usuario

  useEffect(() => {
    const storedToken = Cookies.get("userToken") || "";
    console.log("Valor de storedToken: ", storedToken);

    //const storedRole = Cookies.get("userRole") || "";
    //console.log("Valor de storedRole: ", storedRole);

    setUserToken(storedToken);
    //setUserRole(storedRole);
    //Cookies.remove("token");
    //Cookies.remove("role");
  }, [setUserToken]); // Solo se ejecuta una vez cuando el componente se monta

  //console.log("USERTOKENNNNNNNNNN: ", userToken);

  //Cookies.remove("token");
  //Cookies.remove("role");

  useEffect(() => {
    // Esto se asegura de que los valores se actualicen en el contexto
    const storedToken = Cookies.get("userToken") || "";
    console.log("Valor de storedToken: ", storedToken);

    const storedRole = Cookies.get("userRole") || "";
    console.log("Valor de storedRole: ", storedRole);

    if (storedToken) setUserToken(storedToken);
    if (storedRole) setUserRole(storedRole); //Este lo tenia anulado
  }, [setUserToken, setUserRole]); // Ejecutar cada vez que cambian token o role

  //console.log(userToken);
  //console.log(userRole);
 
  useEffect(() => {
    // Inicializar la opción seleccionada basada en la ruta actual
    const path = window.location.pathname;
    switch (path) {
      case "/":
        setSelectedOption("Inicio");
        break;
      case "/myAccount":
        setSelectedOption("Mi cuenta");
        break;
      case "/myDiscounts":
        setSelectedOption("Mis Descuentos");
        break;
      case "/createDiscount":
        setSelectedOption("Crear Descuento");
        break;
      case "/register":
        setSelectedOption("Crear cuenta");
        break;
      case "/login":
        setSelectedOption("Iniciar sesión");
        break;
      default:
        setSelectedOption("Inicio");
    }
  }, [setSelectedOption]);

  const openMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
    setSelectedOption(selectedOption);
  };

  const handleOptionClick = (optionName: string) => {
    setSelectedOption(optionName);
  };

  const handleLogOutUser = () => {
    console.log("Cerrar sesión");

    Cookies.remove("userToken");
    Cookies.remove("userRole");
    //Cookies.remove("userId");
    //Cookies.remove("userName");
    //ookies.remove("businessName");
    //Cookies.remove("businessId");
    //Cookies.remove("businessType");

    setUserId("");
    setUserRole("");
    setUserToken("");
    setUserName("");

    setIsLoggedIn(false);

    setTimeout(() => {
      router.push("/login");
      setSelectedOption("Iniciar sesión");
    }, 1000); //Si no le doy 1 segundo con el setTimeout no funciona bien .
  };

  useEffect(() => {
    if (backgroundButtonNavBar) {
      setSelectedOption("Inicio"); //Pone al selector de opciones en "Inicio" ni bien se loguea un usuario en el NavBar.
    }
  }, [backgroundButtonNavBar, setSelectedOption]);

  return (
    <div className="w-screen">
      <nav className="w-full bg-[#FD7B03] flex flex-row justify-between items-center px-4 sm:px-5 py-4">
        <div className="w-[70%] custom-w-450:w-auto">
          <p
            className={`${krona.className} text-[22px] text-white custom-w-450:text-[30px] lg:text-[35px]`}
          >
            <Link href={"/"} onClick={() => handleOptionClick("Inicio")}>
              Comé x menos
            </Link>
          </p>
        </div>
        <div className="w-[30%] custom-w-450:w-auto">
          <ul className="w-full flex flex-row justify-end text-[18px] font-medium gap-3 sm:gap-6">
            <Link href={"/"} onClick={() => handleOptionClick("Inicio")}>
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                Inicio
              </li>
              {(selectedOption === "Inicio" ||
                selectedOption === "Come x menos") && (
                <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
              )}
            </Link>

            {userToken && userRole === "adminweb" && (
              <Link
                href={"/myAccount"}
                onClick={() => handleOptionClick("Mi cuenta")}
              >
                <li
                  className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
                >
                  Mi cuenta
                </li>
                {selectedOption === "Mi cuenta" && (
                  <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                )}
              </Link>
            )}

            {userToken === "" && userRole === "" && (
              <Link
                href={"/register"}
                onClick={() => handleOptionClick("Crear cuenta")}
              >
                <li
                  className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
                >
                  Crear cuenta
                </li>
                {selectedOption === "Crear cuenta" && (
                  <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                )}
              </Link>
            )}

            {userToken === "" && userRole === "" && (
              <Link
                href={"/login"}
                onClick={() => handleOptionClick("Iniciar sesión")}
              >
                <li
                  className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
                >
                  Iniciar sesión
                </li>
                {selectedOption === "Iniciar sesión" && (
                  <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                )}
              </Link>
            )}

            {userToken && (
              <div className="">
                <div
                  className="relative md:px-4 py-2 flex gap-2 items-center md:hover:bg-[#FFCF91] md:border-[2px] md:border-[#FFCF91] cursor-pointer text-white md:hover:text-[#FD7B03] z-10"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="flex gap-2 items-center md:hover:bg-[#FFCF91]">
                    <FiUser
                      className="cursor-pointer"
                      size={22}
                    />
                    <p className="hidden md:block cursor-pointer">{userName}</p>
                  </div>
                  {userMenuOpen && (
                    <div className="absolute w-48 right-[-52px] custom-w-450:right-[-50px] sm:right-[-66px] md:right-[-71px] lg:right-[-22px] mt-[189px] custom-w-450:mt-[194px] lg:mt-[219px] py-2 bg-[#FFCF91] rounded-lg shadow-xl">
                      <span
                        className="block text-gray-600 text-right pr-4 font-bold mb-1"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      >
                        X
                      </span>
                      <span className="block text-gray-600 text-xl text-center">
                        {userName}
                      </span>
                      <Link href={"/"}>
                        <button
                          className="block w-full px-4 py-2 text-[#FD7B03] text-center hover:bg-white hover:text-[#FD7B03]"
                          onClick={handleLogOutUser}
                        >
                          Cerrar sesión
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="lg:hidden flex items-center">
              {
                <GiHamburgerMenu
                  className="text-[22px] md:text-[25px]"
                  color="white"
                  onClick={openMenu}
                /> 
              }
            </div>
          </ul>
        </div>
      </nav>
      <div className="lg:hidden">
        <Menu open={open} closeMenu={closeMenu} />
      </div>
    </div>
  );
};

export default Navbar;