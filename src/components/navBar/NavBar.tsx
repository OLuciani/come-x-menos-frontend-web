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
    //userId,
    //setUserId,
    userRole,
    setUserRole,
    userName,
    setUserName,
    backgroundButtonNavBar,
    selectedOption,
    setSelectedOption,
    userToken,
    setUserToken,
    isLoggedIn,
    setIsLoggedIn,
    setBusinessName,
    setBusinessType,
    userStatus,
    setUserStatus,
    //setBusinessId
  } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [roleAppAdmin, setRoleAppAdmin] = useState<string | undefined>("");
  const [roleBusinessDirector, setRoleBusinessDirector] = useState<string | undefined>("");
  const [roleBusinessManager, setRoleBusinessManager] = useState<string | undefined>("");
  const [roleBusinessEmployee, setRoleBusinessEmployee] = useState<string | undefined>("");
  const [roleUser, setRoleUser] = useState<string | undefined>("");
  const [showName, setShowName] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const storedToken = Cookies.get("userToken") || "";
      console.log("Valor de storedToken: ", storedToken);

      setUserToken(storedToken);

      //Configuro una variable de estado p/cada rol y le adjudico el valor que dicho rol tiene en la variable de entorno.
      /* const appAdmin: string | undefined = process.env.NEXT_PUBLIC_ROLE_APP_ADMIN;
      setRoleAppAdmin(appAdmin); */
      setRoleAppAdmin("appAdmin");
    
      /* const businessDirector: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_DIRECTOR;
      setRoleBusinessDirector(businessDirector); */
      setRoleBusinessDirector("businessDirector");

      /* const businessManager: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_MANAGER;
      setRoleBusinessManager(businessManager); */
      setRoleBusinessManager("businessManager");

      /* const businessEmployee: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_EMPLOYEE;
      setRoleBusinessEmployee(businessEmployee); */
      setRoleBusinessEmployee("businessEmployee");

      /* const user: string | undefined = process.env.NEXT_PUBLIC_ROLE_USER;
      setRoleUser(user); */
    }
  }, [isLoggedIn, setUserToken]); // Solo se ejecuta una vez cuando el componente se monta y está iniciada la sesión de usuario

  useEffect(() => {
    const storedToken = Cookies.get("userToken") || "";
    console.log("Valor de storedToken: ", storedToken);

    //Configuro cada rol
    const appAdmin: string | undefined = process.env.NEXT_PUBLIC_ROLE_APP_ADMIN;
    setRoleAppAdmin(appAdmin);
  
    const businessDirector: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_DIRECTOR;
    setRoleBusinessDirector(businessDirector);

    const businessManager: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_MANAGER;
    setRoleBusinessManager(businessManager);

    const businessEmployee: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_EMPLOYEE;
    setRoleBusinessEmployee(businessEmployee);

    setUserToken(storedToken);
    
  }, [setUserToken]); // Solo se ejecuta una vez cuando el componente se monta


  useEffect(() => {
    // Esto se asegura de que los valores se actualicen en el contexto
    const storedToken = Cookies.get("userToken") || "";
    console.log("Valor de storedToken: ", storedToken);

    const storedRole = Cookies.get("userRole") || "";
    console.log("Valor de storedRole: ", storedRole);

    if (storedToken) setUserToken(storedToken);
    if (storedRole) setUserRole(storedRole); //Este lo tenia anulado
  }, [setUserToken, setUserRole]); // Ejecutar cada vez que cambian token o role
 
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
      case "/notifications":
        setSelectedOption("Notificaciones");
        break;
      case "/dashboardAdmin":
        setSelectedOption("Admin App");
        break;
      case "/myDiscounts":
        setSelectedOption("Mis Descuentos");
        break;
      case "/createDiscount":
        setSelectedOption("Crear Descuento");
        break;
      /* case "/register": */
      case "/emailConfirm":
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

    setUserMenuOpen(false); 

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

  useEffect(() => {
    console.log("Valor de userRole en useEffect navbar: ", userRole);
    console.log("Valor de roleBusinessDirector en useEffect navbar: ", roleBusinessDirector);
    console.log("Valor de roleAppAdmin en useEffect navbar: ", roleAppAdmin);

    setUserMenuOpen(false);
  }, []);

  useEffect(() => {
    // Función que verifica el tamaño de la pantalla
    const handleResize = () => {
      // Si el ancho de la pantalla es menor a 768px (md), cambia showName a true
      if (window.innerWidth < 768) {
        setShowName(true);
      } else {
        setShowName(false);
      }
    };

    // Ejecutar la función al cargar el componente
    handleResize();

    // Agregar un event listener para cambiar el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen">
      <nav className="w-full bg-[#FD7B03] flex flex-row justify-between items-center px-4 sm:px-5 py-4">
        {/* <div className="w-[70%] custom-w-450:w-auto"> */}
        <div className="">
          <p
            className={`${krona.className} text-[22px] text-white custom-w-450:text-[30px] lg:text-[35px]`}
          >
            <Link href={"/"} onClick={() => handleOptionClick("Inicio")}>
              Comé x menos
            </Link>
          </p>
        </div>
        <div className="w-[30%] custom-w-450:w-auto">
          <ul className="w-full flex flex-row justify-end text-[18px] font-medium gap-6">
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
            

            {userToken  && (userRole === roleBusinessDirector || userRole === roleBusinessManager || userRole === roleBusinessEmployee) && userStatus === "active" && (
              <Link
                //href={"/myAccount"}
                href={"/dashboardBusinessAdmin"}
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

            {userToken  && userStatus === "pending" && (
              <Link
                href={"/notifications"}
                onClick={() => handleOptionClick("Notificaciones")}
              >
                <li
                  className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
                >
                  Notificaciones
                </li>
                {selectedOption === "Notificaciones" && (
                  <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                )}
              </Link>
            )}


            {userToken  && userRole === roleAppAdmin && userStatus === "active" && (
              <Link
                //href={"/dashboardAppAdmin"}
                href={"/dashboardAplicationAdmin"}
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


            {(userToken === "" && userRole === "")  && (
              <Link
                //href={"/register"}
                href={"/emailConfirm"}
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
              <div className="relative">
                {userMenuOpen && (
                    <div className="absolute w-48 right-[-52px] custom-w-450:right-[-50px] sm:right-[-66px] md:right-[-71px] lg:right-[-22px] mt-[54px] custom-w-450:mt-[57px] md:mt-[62px] lg:mt-[73px] p-2 bg-[#FFCF91] rounded-lg shadow-xl z-20">
                      <span
                        className="block text-gray-600 text-right pr-4 font-bold mb-1 cursor-pointer"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      >
                        X
                      </span>

                      <span className={`${showName ? "block text-gray-600 text-xl text-center" : "hidden"}`}>
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
                <div
                  className="md:px-4 py-2 flex gap-2 items-center md:hover:bg-[#FFCF91] md:border-[2px] md:border-[#FFCF91] cursor-pointer text-white md:hover:text-[#FD7B03] z-10"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="flex gap-2 items-center md:hover:bg-[#FFCF91]">
                    <FiUser
                      className="cursor-pointer"
                      size={22}
                    />
                    <p className="hidden md:block cursor-pointer">{userName}</p>
                  </div>
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