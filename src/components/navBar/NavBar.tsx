"use client"
import React, { useState, useEffect, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Menu from "./Menu";
import { Krona_One } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router"; // Importar useRouter directamente
import { Context } from "@/context/Context";
import { FiUser } from "react-icons/fi";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  const { userId, setUserId, newRole, setNewRole, userToken, setUserToken, userName, setUserName, backgroundButtonNavBar } =
    useContext(Context);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("Inicio");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
  }, []);

  const openMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleOptionClick = (optionName: string) => {
    setSelectedOption(optionName);
  };

  const handleLogOutUser = () => {
    console.log("Cerrar sesión");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("_id");
    localStorage.removeItem("name");

    setUserId("");
    setNewRole("");
    setUserToken("");
    setUserName("");


    setTimeout(() => {
      setSelectedOption("Inicio");
    }, 1000);
  };

  useEffect(() => {
    if (backgroundButtonNavBar) {
      setSelectedOption("Inicio"); //Pone al selector de opciones en "Inicio" ni bien se loguea un usuario en el NavBar.
    }
  }, [backgroundButtonNavBar]);

  return (
    <nav className="bg-[#FD7B03] flex flex-row justify-between items-center px-5 py-4">
      <p
        className={`${krona.className} text-[18px] text-white md:text-[22px] lg:text-[35px]`}
      >
        <Link href={"/"} onClick={() => handleOptionClick("Inicio")}>
          Comé x menos
        </Link>
      </p>
      <div>
        <ul className="flex flex-row text-[18px] font-medium gap-4 lg:gap-8">
          <Link href={"/"} onClick={() => handleOptionClick("Inicio")}>
            <li
              className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
            >
              Inicio
            </li>
            {(selectedOption === "Inicio" || selectedOption === "Come x menos") && <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>}
          </Link>

          {userToken !== "" && newRole === "adminweb" && (
            <Link
              href={"/myAccount"}
              onClick={() => handleOptionClick("Mi cuenta")}
            >
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                Mi cuenta
              </li>
              {(selectedOption === "Mi cuenta") && <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>}
            </Link>
          )}

          {/* {userToken !== "" && newRole === "adminweb" && (
            <Link
              href={"/myDiscounts"}
              onClick={() => handleOptionClick("Mis Descuentos")}
            >
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex ${
                  selectedOption === "Mis Descuentos"
                    ? "bg-[#FFCF91] text-[#FD7B03]"
                    : "text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]"
                }`}
              >
                Mis Descuentos
              </li>
            </Link>
          )} */}

         {/*  {userToken !== "" && newRole === "adminweb" && (
            <Link
              href={"/createDiscount"}
              onClick={() => handleOptionClick("Crear Descuento")}
            >
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex ${
                  selectedOption === "Crear Descuento"
                    ? "bg-[#FFCF91] text-[#FD7B03]"
                    : "text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]"
                }`}
              >
                Crear Descuento
              </li>
            </Link>
          )} */}

          {userToken === "" && newRole === "" && (
            <Link
              href={"/register"}
              onClick={() => handleOptionClick("Crear cuenta")}
            >
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                Crear cuenta
              </li>
              {(selectedOption === "Crear cuenta") && <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>}
            </Link>
          )}

          {userToken === "" && newRole === "" && (
            <Link
              href={"/login"}
              onClick={() => handleOptionClick("Iniciar sesión")}
            >
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                Iniciar sesión
              </li>
              {(selectedOption === "Iniciar sesión") && <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>}
            </Link>
          )}

          {userToken && (
              <div onClick={() => setSelectedOption("Cerrar sesión")}>
            <div className="relative px-4 py-2 flex gap-2 items-center hover:bg-[#FFCF91] border-[2px] border-[#FFCF91] cursor-pointer" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div className="flex gap-2 items-center text-white hover:text-[#FD7B03] hover:bg-[#FFCF91]">
                  <FiUser
                    className="hover:text-[#FD7B03] cursor-pointer"
                    size={22}
                  />
                  <p className="relative hidden sm:block cursor-pointer">{userName}</p>
                </div>
                {userMenuOpen && (
                  <div className="absolute w-48 right-[-20px] mt-44 py-2 bg-[#FFCF91] rounded-lg shadow-xl">
                    <span className="block text-gray-600 text-right pr-4 font-bold mb-1" onClick={() => setUserMenuOpen(!userMenuOpen)}>X</span>
                    <span className="block px-4 py-2 text-gray-800 sm:hidden">{userName}</span>
                    <Link href={"/"}>
                      <button
                        className="block w-full text-left px-4 py-2 text-[#FD7B03] hover:bg-white hover:text-[#FD7B03]"
                        onClick={handleLogOutUser}
                      >
                        Cerrar sesión
                      </button>
                    </Link>
                  </div>
                )}

              </div>
                {(selectedOption === "Cerrar sesión") && <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>} 
                </div>
          )}

          <div className="lg:hidden">
            {!open ? (
              <GiHamburgerMenu size={25} color="white" onClick={openMenu} />
            ) : (
              <AiOutlineClose size={25} color="white" onClick={openMenu} />
            )}
            <Menu open={open} closeMenu={closeMenu} />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
