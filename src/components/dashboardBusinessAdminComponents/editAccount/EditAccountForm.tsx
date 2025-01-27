"use client";
//Este venia funcionando pero le agregue algunas cosas para que persistan los datos al refrescar pagina
import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/api/userService";
import { getBusinessById, updateBusiness } from "@/api/businessService";
//import { getUserById, updateUser, getBusinessById, updateBusiness} from "@/services/apiCall";
import Input from "@/components/InputAuth/Input";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import MessageModal from "@/components/messageModal/MessageModal";

interface EditAccountFormProps {
  businessId: string;
  setSection: (section: string) => void;
  section: string;
}

interface InitialValues {
  name: string;
  lastName: string;
  businessName: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  imageURL: File | string | null;
  businessType: string;
}

const EditAccountForm: React.FC<EditAccountFormProps> = ({setSection, section}) => {
  const [initialValues, setInitialValues] = useState<InitialValues>({
    name: "",
    lastName: "",
    businessName: "",
    address: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    imageURL: null,
    businessType: "",
  });

  //const [userToken, setUserToken] = useState<string>("");
  const {
    userId,
    businessId,
    userRole,
    setBusinessName,
    setBusinessType,
    isLoggedIn,
    userToken,
    setUserToken,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessId,
    setSelectedOption,
    setUserStatus,
  } = useContext(Context);
  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx
  const router = useRouter();

  const [isOpenMessageModal, setIsOpenMessageModal] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [messageTitle, setMessageTitle] = useState<string>("");
  const [messageRouterRedirection, setMessageRouterRedirection] = useState<string>("");
  const [selectedNavBarOption, setSelectedNavBarOption] = useState<string>("");

  const [businessDirectorRole, setBusinessDirectorRole] = useState<
    string | undefined
  >("");

  const roleAppAdmin = process.env.NEXT_PUBLIC_ROLE_APP_ADMIN;
  const roleBusinessDirector = process.env.NEXT_PUBLIC_ROLE_BUSINESS_DIRECTOR;
  const roleBusinessManager = process.env.NEXT_PUBLIC_ROLE_BUSINESS_MANAGER;
  const roleBusinessEmployee = process.env.NEXT_PUBLIC_ROLE_BUSINESS_EMPLOYEE;

  useEffect(() => {
    setBusinessDirectorRole(roleBusinessDirector);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);

      const cookieUserRole = Cookies.get("userRole") || "";
      setUserRole(cookieUserRole);
    }
  }, [isLoggedIn, setUserToken, setUserRole]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await getUserById();
        const fetchedBusiness = await getBusinessById();

        console.log("Fetched User Data:", fetchedUser);
        console.log("Fetched Business Data:", fetchedBusiness);

        setUser(fetchedUser);

        setBusiness(fetchedBusiness);

        // Guardo al usuario recuperado en fetchedUser en una cookie
        Cookies.set("userRecovered", JSON.stringify(fetchedUser));

        // Guardo al negocio recuperado en fetchedBusiness en una cookie
        Cookies.set("businessRecovered", JSON.stringify(fetchedBusiness));

        setInitialValues({
          name: fetchedUser.name || "",
          lastName: fetchedUser.lastName || "",
          businessName: fetchedBusiness.businessName || "",
          address: fetchedBusiness.address || "",
          city: fetchedBusiness.city || "",
          country: fetchedBusiness.country || "",
          email: fetchedUser.email || "",
          phone: fetchedUser.phone || "",
          imageURL: fetchedBusiness.imageURL || null, // Use the existing URL if it exists
          businessType: fetchedBusiness.businessType || "",
        });

        setDataLoaded(true); // Set flag to true when data is loaded
      } catch (err) {
        setError("Error al cargar los datos.");
      }
    };

    fetchData();
  }, [userId, businessId, userToken]);

  useEffect(() => {
    setSelectedOption("Mi cuenta");
  }, [setSelectedOption]);

  //A este useEffect lo creé para cuando se refresca la vista de este componente
  useEffect(() => {
    try {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);

      const cookieUserRole = Cookies.get("userRole") || "";
      setUserRole(cookieUserRole);

      const cookieUserId = Cookies.get("userId") || "";
      setUserId(cookieUserId);

      const cookieUserName = Cookies.get("userName") || "";
      setUserName(cookieUserName);

      const cookieBusinessName = Cookies.get("businessName") || "";
      setBusinessName(cookieBusinessName);

      const cookieBusinessId = Cookies.get("businessId") || "";
      setBusinessId(cookieBusinessId);

      const cookieBusinessType = Cookies.get("businessType") || "";
      setBusinessType(cookieBusinessType);

      const cookieUserStatus = Cookies.get("userStatus") || "";
      setUserStatus(cookieUserStatus);

      setSelectedOption("Mi cuenta");

      const savedUser = Cookies.get("userRecovered") || "";

      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      const savedBusiness = Cookies.get("businessRecovered") || "";

      const parsedBusiness = JSON.parse(savedBusiness);
      setBusiness(parsedBusiness);

      setInitialValues({
        name: parsedUser?.name || "",
        lastName: parsedUser?.lastName || "",
        businessName: parsedBusiness.businessName || "",
        address: parsedBusiness.address || "",
        city: parsedBusiness.city || "",
        country: parsedBusiness.country || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        imageURL: parsedBusiness.imageURL || null, // Use the existing URL if it exists
        businessType: parsedBusiness.businessType || "",
      });

      setDataLoaded(true); // Set flag to true when data is loaded
    } catch (err) {
      setError("Error al cargar los datos.");
    }
  }, [
    setUserToken,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessName,
    setBusinessId,
    setBusinessType,
    setSelectedOption,
  ]);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    lastName: Yup.string().min(
      3,
      "El apellido debe tener al menos 3 caracteres"
    ),
    businessName: Yup.string().min(
      3,
      "El nombre del negocio debe tener al menos 3 caracteres"
    ),
    address: Yup.string().min(
      3,
      "La dirección debe tener al menos 3 caracteres"
    ),
    city: Yup.string().min(3, "La ciudad debe tener al menos 3 caracteres"),
    country: Yup.string().min(3, "El país debe tener al menos 3 caracteres"),
    phone: Yup.string(),
    imageURL: Yup.mixed().nullable(),
    businessType: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      setIsLoading(true);
      try {
        const userUpdate = await updateUser({
          name: values.name,
          lastName: values.lastName,
          //email: values.email,
          phone: values.phone,
          businessName: values.businessName,
          businessType: values.businessType,
        });

        console.log("VALOR DE userUpdate: ", userUpdate.message);
        /* if (userUpdate.message !== "Usuario actualizado correctamente") {
          //Variables para el mensaje de edición exitosa de la cuenta al usuario
          const title: string = "No puedes editar la cuenta, no tienes credenciales para hacerlo";
          setMessageTitle(title);

          const text: string = `Serás redirigido a la sección Resumen del dashboard.`;
          setMessageText(text);

          setIsOpenMessageModal(true);

          const navBarOption: string = "Mi cuenta";
          setSelectedNavBarOption(navBarOption);

          setTimeout(() => {   
              setSection("resumen");
              const mainElement = document.querySelector("main");
              if (mainElement) {
                mainElement.scrollTo(0, 0);
              }
          }, 10000);
        } */

        const formData = new FormData();
        formData.append("businessName", values.businessName);
        formData.append("address", values.address);
        formData.append("city", values.city);
        formData.append("country", values.country);
        formData.append("businessType", values.businessType);

        // Append imageURL only if it's a File (new image uploaded)
        if (values.imageURL instanceof File) {
          formData.append("imageURL", values.imageURL);
        } else if (typeof values.imageURL === "string") {
          // If imageURL is a string (existing URL), append it as a string
          formData.append("existingImageURL", values.imageURL);
        }

        // Log the formData entries for debugging
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        if (userRole === roleBusinessDirector) {
          const businessUpdate = await updateBusiness(formData);

          if (
            /* userUpdate !== "Token inválido o expirado" ||
            businessUpdate !== "Token inválido o expirado" */
            userUpdate && businessUpdate
          ) {
            const cookieBusinessName = Cookies.get("businessName") || "";
            setBusinessName(cookieBusinessName);

            const cookieBusinessType = Cookies.get("businessType") || "";
            setBusinessType(cookieBusinessType);

            //Variables para el mensaje de edición exitosa de la cuenta al usuario
            const title: string = "Tu cuenta se ha editado exitosamente";
            setMessageTitle(title);

            const text: string = `Serás redirigido a la sección Resumen del dashboard.`;
            setMessageText(text);

            setIsOpenMessageModal(true);

            const navBarOption: string = "Mi cuenta";
            setSelectedNavBarOption(navBarOption);

            setTimeout(() => {   
                setSection("resumen");
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
            }, 10000);
          } else {
            /* setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login */
            setError("Error al actualizar los datos.");
          }
          /* //Variables para el mensaje de edición exitosa de la cuenta al usuario
            const title: string = "Tu cuenta se ha editado exitosamente";
            setMessageTitle(title);

            const text: string = `Serás redirigido a la sección Resumen del dashboard.`;
            setMessageText(text);

            setIsOpenMessageModal(true);

            const navBarOption: string = "Mi cuenta";
            setSelectedNavBarOption(navBarOption);

            setTimeout(() => {   
                setSection("resumen");
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
            }, 10000); */
        } else if (userRole === roleAppAdmin) {
          setTimeout(() => {
            router.push("/dashboardAplicationAdmin");
          }, 2000);
        } else if (userRole === roleBusinessManager) {
          setTimeout(() => {
            router.push("/dashboardBusinessAdmin");
          }, 2000);
        } /* else if (userRole === roleBusinessEmployee) {
          //Variables para el mensaje de edición exitosa de la cuenta al usuario
          const title: string = "Tu cuenta se ha editado exitosamente";
          setMessageTitle(title);

          const text: string = `Serás redirigido a la sección Resumen del dashboard.`;
          setMessageText(text);

          setIsOpenMessageModal(true);

          const navBarOption: string = "Mi cuenta";
          setSelectedNavBarOption(navBarOption);
          setTimeout(() => {
            router.push("/dashboardBusinessAdmin");

            setSection("resumen");

            const mainElement = document.querySelector("main");
            if (mainElement) {
              mainElement.scrollTo(0, 0);
            }
          }, 10000);
        } */
        /* //Variables para el mensaje de edición exitosa de la cuenta al usuario
        const title: string = "Tu cuenta se ha editado exitosamente";
        setMessageTitle(title);

        const text: string = `Serás redirigido a la sección Resumen del dashboard.`;
        setMessageText(text);

        setIsOpenMessageModal(true);

        const navBarOption: string = "Mi cuenta";
        setSelectedNavBarOption(navBarOption);

        setTimeout(() => {   
            setSection("resumen");
            const mainElement = document.querySelector("main");
            if (mainElement) {
              mainElement.scrollTo(0, 0);
            }
        }, 10000); */
        if (userUpdate.message !== "Usuario actualizado correctamente") {
          //Variables para el mensaje de edición exitosa de la cuenta al usuario
          const title: string = "No puedes editar la cuenta, no tienes credenciales para hacerlo";
          setMessageTitle(title);

          const text: string = `Serás redirigido a la sección Resumen del dashboard.`;
          setMessageText(text);

          setIsOpenMessageModal(true);

          const navBarOption: string = "Mi cuenta";
          setSelectedNavBarOption(navBarOption);

          setTimeout(() => {   
              setSection("resumen");
              const mainElement = document.querySelector("main");
              if (mainElement) {
                mainElement.scrollTo(0, 0);
              }
          }, 10000);
        }
      } catch (err) {
        setError("Error de red o el servidor no está disponible.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (!dataLoaded) {
    return (
      <div>
        <p className="text-center">Cargando datos...</p>
      </div>
    ); // Display loading state while data is being fetched
  }

  console.log("Formik Values:", formik.values);

  return (
    <div>
        {/* <TokenExpiredModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        /> */}

        {/* Modal para mostrar mensajes al usuario */}
        <MessageModal
            isOpenMessageModal={isOpenMessageModal}
            onCloseMessageModal={() => setIsOpenMessageModal(false)}
            messageTitle={messageTitle}
            messageText={messageText}
            messageRouterRedirection={messageRouterRedirection}
            selectedNavBarOption={selectedNavBarOption}
        />

        <form
        className="flex flex-col items-center mx-auto gap-6 "
        onSubmit={formik.handleSubmit}
        >
            <Input
            label="Nombre"
            placeholder=""
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            minLength={3}
            />
            {formik.touched.name && formik.errors.name ? (
            <p className="text-red-700">{formik.errors.name}</p>
            ) : null}

            <Input
            label="Apellido"
            placeholder=""
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            minLength={3}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
            <p className="text-red-700">{formik.errors.lastName}</p>
            ) : null}

            <Input
            label="Teléfono"
            placeholder=""
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
            <p className="text-red-700">{formik.errors.phone}</p>
            ) : null}

            {/* Oculto inputs a roles que no sean businessDirector. Aparte de esto, la ruta en el backend también tiene un filtro con authorizateRole que autoriza solo al rol businessDirector a editar datos del negocio. */}
            <div className={`${businessDirectorRole && userRole !== businessDirectorRole ? "hidden" : "w-full flex flex-col items-center mx-auto gap-6"
            } `}
            >
                <Input
                    label="Nombre del negocio"
                    placeholder=""
                    type="text"
                    name="businessName"
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength={3}
                />
                {formik.touched.businessName && formik.errors.businessName ? (
                    <p className="text-red-700">{formik.errors.businessName}</p>
                ) : null}

                <div className="w-full">
                    <label
                    htmlFor="businessType"
                    className="text-sm ml-[15px] font-medium text-black"
                    >
                    Tipo de negocio
                    </label>
                    <select
                    id="businessType"
                    name="businessType"
                    value={formik.values.businessType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 block w-full h-[50px] px-3 border border-[gray] bg-white rounded-[10px] shadow-sm focus:outline-none focus:ring-[gray] focus:border-[gray] sm:text-sm"
                    >
                    <option value="" label="Seleccionar tipo de negocio" />
                    <option value="Restaurantes" label="Restaurante" />
                    <option value="Bares" label="Bar" />
                    <option value="Panaderías" label="Panadería" />
                    <option value="Pizzerías" label="Pizzería" />
                    </select>
                    {formik.touched.businessType && formik.errors.businessType ? (
                    <p className="text-red-700">{formik.errors.businessType}</p>
                    ) : null}
                </div>

                <Input
                    label="Dirección"
                    placeholder=""
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength={3}
                />
                {formik.touched.address && formik.errors.address ? (
                    <p className="text-red-700">{formik.errors.address}</p>
                ) : null}

                <Input
                    label="Ciudad"
                    placeholder=""
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength={3}
                />
                {formik.touched.city && formik.errors.city ? (
                    <p className="text-red-700">{formik.errors.city}</p>
                ) : null}

                <Input
                    label="País"
                    placeholder=""
                    type="text"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength={3}
                />
                {formik.touched.country && formik.errors.country ? (
                    <p className="text-red-700">{formik.errors.country}</p>
                ) : null}

                {/* <div className="w-full ">
                    <label
                    htmlFor="imageURL"
                    className="text-sm ml-[15px] font-medium text-black"
                    >
                    Imagen del negocio
                    </label>
                    <div className="mt-1 flex items-center w-full h-[50px] px-3 border border-[gray] bg-white rounded-[10px] shadow-sm focus:outline-none focus:ring-[black] focus:border-[gray] sm:text-sm">
                    <input
                        id="imageURL"
                        name="imageURL"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                        formik.setFieldValue(
                            "imageURL",
                            event.currentTarget.files
                            ? event.currentTarget.files[0]
                            : null
                        );
                        }}
                        onBlur={formik.handleBlur}
                    />
                    </div>
                    {formik.touched.imageURL && formik.errors.imageURL ? (
                    <p className="text-red-700">{formik.errors.imageURL}</p>
                    ) : null}
                </div> */}

                <div className="w-full">
                    <Input
                        label="Cargar imagen del negocio"
                        placeholder=""
                        type="file"
                        name="imageURL"
                        onChange={(event) => {
                        if (
                            event.currentTarget.files &&
                            event.currentTarget.files[0]
                        ) {
                            formik.setFieldValue(
                            "imageURL",
                            event.currentTarget.files[0]
                            );
                        } else {
                            formik.setFieldValue("imageURL", null); // Limpiar el valor si se cancela la selección
                        }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.imageURL}
                    />

                    {(formik.touched.imageURL || formik.submitCount > 0) &&
                    formik.errors.imageURL ? (
                        <p className="text-red-700 text-center mt-1">
                        {formik.errors.imageURL}
                        </p>
                    ) : null}
                </div>
            </div>

                {/* <Input
                label="Correo electrónico"
                placeholder=""
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                <p className="text-red-700">{formik.errors.email}</p>
                ) : null} */}

                {/* <Input
                label="Teléfono"
                placeholder=""
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-700">{formik.errors.phone}</p>
                ) : null} */}

                {/* <div className="w-full ">
                <label
                    htmlFor="imageURL"
                    className="text-sm ml-[15px] font-medium text-black"
                >
                    Imagen del negocio
                </label>
                <div className="mt-1 flex items-center w-full h-[50px] px-3 border border-[gray] bg-white rounded-[10px] shadow-sm focus:outline-none focus:ring-[black] focus:border-[gray] sm:text-sm">
                    <input
                    id="imageURL"
                    name="imageURL"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        formik.setFieldValue(
                        "imageURL",
                        event.currentTarget.files
                            ? event.currentTarget.files[0]
                            : null
                        );
                    }}
                    onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.imageURL && formik.errors.imageURL ? (
                    <p className="text-red-700">{formik.errors.imageURL}</p>
                ) : null}
                </div> */}

                <Button buttonText={isLoading ? "Guardando..." : "Guardar cambios"} />

                {error && <p className="text-red-700">{error}</p>}
        </form>
    </div>
  );
};

export default EditAccountForm;
