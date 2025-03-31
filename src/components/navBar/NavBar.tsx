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
      /* const businessDirector: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_DIRECTOR;
      setRoleBusinessDirector(businessDirector); */
      /* const businessManager: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_MANAGER;
      setRoleBusinessManager(businessManager); */
      /* const businessEmployee: string | undefined = process.env.NEXT_PUBLIC_ROLE_BUSINESS_EMPLOYEE;
      setRoleBusinessEmployee(businessEmployee); */


      //Adjudico los roles a las constantes directamente y no con variables de entorno, ya que al utilizar un proxy en next.config.mjs para solucionar el problema con las cookies de terceros en algunos dispositivos que tienen por defecto navegadores como por ejemplo safari que no acepta cookies de terceros ese proxy crea conflicto con las variables de entorno en producción de vercel. Lo hago porque los valores que se adjudican no son datos sensibles, ya que los verdaderos roles son secrets que van en las cookies y se utilizan solo en el backend para autenticar roles en las rutas de las solicitudes.
      setRoleAppAdmin("appAdmin");
      setRoleBusinessDirector("businessDirector");
      setRoleBusinessManager("businessManager");
      setRoleBusinessEmployee("businessEmployee");

      /* const user: string | undefined = process.env.NEXT_PUBLIC_ROLE_USER;
      setRoleUser(user); */
    }
  }, [isLoggedIn, setUserToken]); // Solo se ejecuta una vez cuando el componente se monta y está iniciada la sesión de usuario

  useEffect(() => {
    const storedToken = Cookies.get("userToken") || "";
    console.log("Valor de storedToken: ", storedToken);
    setUserToken(storedToken);

    //Configuro cada rol
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <nav className="w-full bg-[#FD7B03]  flex flex-row justify-between items-center px-4 sm:px-5 py-4">
        {/* <div className="w-[70%] custom-w-450:w-auto"> */}
        <div className="">
          <p
            className={`${krona.className} text-[22px] text-white font-bold custom-w-450:text-[30px] lg:text-[35px]`}
          >
            <Link href={"/"} onClick={() => handleOptionClick("Inicio")}>
              Comé x menos
            </Link>
          </p>
        </div>

        <div className="w-[30%] custom-w-450:w-auto">
          <ul className="w-full flex flex-row justify-end text-lg font-semibold gap-6">
            <li
              className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              /* style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.textShadow = "1px 1px 2px rgba(255, 255, 255, 0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)")} */
            >
              <Link href={"/"} onClick={() => handleOptionClick("Inicio")}>
                  Inicio
                {(selectedOption === "Inicio" ||
                  selectedOption === "Come x menos") && (
                  <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                )}
              </Link>
            </li>
            

            {userToken  && (userRole === roleBusinessDirector || userRole === roleBusinessManager || userRole === roleBusinessEmployee) && userStatus === "active" && (
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                <Link
                  //href={"/myAccount"}
                  href={"/dashboardBusinessAdmin"}
                  onClick={() => handleOptionClick("Mi cuenta")}
                >
                    Mi cuenta
                  {selectedOption === "Mi cuenta" && (
                    <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                    )}
                </Link>
              </li>
            )}

            {userToken  && userStatus === "pending" && (
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                <Link
                  href={"/notifications"}
                  onClick={() => handleOptionClick("Notificaciones")}
                >
                    Notificaciones
                  {selectedOption === "Notificaciones" && (
                    <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                    )}
                </Link>
              </li>
            )}

            {userToken  && userRole === roleAppAdmin && userStatus === "active" && (
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                <Link
                  //href={"/dashboardAppAdmin"}
                  href={"/dashboardAplicationAdmin"}
                  onClick={() => handleOptionClick("Mi cuenta")}
                >
                    Mi cuenta
                  {selectedOption === "Mi cuenta" && (
                    <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                    )}
                </Link>
              </li>
            )}


            {(userToken === "" && userRole === "")  && (
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                <Link
                  //href={"/register"}
                  href={"/emailConfirm"}
                  onClick={() => handleOptionClick("Crear cuenta")}
                >
                    Crear cuenta
                  {selectedOption === "Crear cuenta" && (
                    <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                    )}
                </Link>
              </li>
            )}

            {userToken === "" && userRole === "" && (
              <li
                className={`border-[2px] border-[#FFCF91] py-2 px-4 hidden lg:flex text-white hover:bg-[#FFCF91] hover:text-[#FD7B03]`}
              >
                <Link
                  href={"/login"}
                  onClick={() => handleOptionClick("Iniciar sesión")}
                >
                    Iniciar sesión
                  {selectedOption === "Iniciar sesión" && (
                    <div className="w-full h-[3px] mt-2 bg-[#FFCF91]"></div>
                    )}
                </Link>
              </li>
            )}

            {userToken && (
              <li className="relative">
                {userMenuOpen && (
                    <div className="absolute w-48 right-[-62px] custom-w-450:right-[-60px] sm:right-[-66px] md:right-[-71px] lg:right-[-22px] mt-[54px] custom-w-450:mt-[57px] md:mt-[62px] lg:mt-[73px] p-2 bg-[#FFCF91] rounded-lg shadow-xl z-20">
                      <div className="w-full flex justify-end mb-3">
                        <p
                          className="w-6 text-center block text-[#FD7B03] font-bold mb-1 cursor-pointer border-2 rounded bg-white hover:border-[#FD7B03]"
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                          X
                        </p>
                      </div>

                      <span className={`${showName ? "block text-gray-600 text-xl text-center mb-2" : "hidden"}`}>
                        {userName}
                      </span>

                      <Link href={"/"}>
                        <button
                          className="block w-full bg-white px-4 py-1 text-[#FD7B03] text-center bg-text-gray-100 hover:bg-[#FD7B03] hover:text-white rounded"
                          onClick={handleLogOutUser}
                        >
                          Cerrar sesión
                        </button>
                      </Link>
                    </div>
                  )}
                <div
                  className="md:px-4 pt-2 pb-[19px] flex gap-2 items-center md:hover:bg-[#FFCF91] md:border-[2px] md:border-[#FFCF91] cursor-pointer text-white md:hover:text-[#FD7B03] z-10"
                  onClick={() => setUserMenuOpen(!userMenuOpen)} //A pb le di un valor de 19px en vez de pb-4 p/compensar los 3px de la linea que marca el boton seleccionado
                >
                  <div 
                    className="flex gap-2 items-center md:hover:bg-[#FFCF91]"
                    
                  >
                    <FiUser
                      className="cursor-pointer"
                      size={22}
                      aria-label="El usuario inició sesión"
                    />
                    <p className="hidden md:block cursor-pointer">{userName}</p>
                  </div>
                </div>
              </li>
            )}

            <li className="lg:hidden flex items-center">
              <button 
                onClick={openMenu} 
                type="button" 
                aria-label="Abrir menú"
                title="Abrir menú"
              >
                <GiHamburgerMenu className="text-white text-[22px] md:text-[25px]" aria-hidden="true" />
              </button>
            </li>
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