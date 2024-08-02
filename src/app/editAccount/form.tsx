"use client";
/* import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { getUserById, updateUser, getBusinessById, updateBusiness } from "@/services/apiCall";
import Input from "@/components/InputAuth/Input";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";

interface FormEditUserAndBusinessProps {
  businessId: string;
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
  imageURL: File | Blob | null;
  businessType: string;
}

const FormEditUserAndBusiness: React.FC<FormEditUserAndBusinessProps> = () => {
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

  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);

  const [userToken, setUserToken] = useState<string>("");
  const { userId, businessId, setBusinessName, setBusinessType, isLoggedIn } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await getUserById(userId, userToken);
        const fetchedBusiness = await getBusinessById(businessId, userToken);

        console.log("Fetched User Data:", fetchedUser);
        console.log("Fetched Business Data:", fetchedBusiness);

        setUser(fetchedUser);
        setBusiness(fetchedBusiness);

        setInitialValues({
          name: fetchedUser.name || "",
          lastName: fetchedUser.lastName || "",
          businessName: fetchedBusiness.businessName || "",
          address: fetchedBusiness.address || "",
          city: fetchedBusiness.city || "",
          country: fetchedBusiness.country || "",
          email: fetchedUser.email || "",
          phone: fetchedUser.phone || "",
          imageURL: fetchedBusiness.imageURL ? new Blob() : null,
          businessType: fetchedBusiness.businessType || "",
        });

        setDataLoaded(true);  // Set flag to true when data is loaded
      } catch (err) {
        setError("Error al cargar los datos.");
      }
    };

    fetchData();
  }, [userId, businessId]);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    lastName: Yup.string().min(3, "El apellido debe tener al menos 3 caracteres"),
    businessName: Yup.string().min(3, "El nombre del negocio debe tener al menos 3 caracteres"),
    address: Yup.string().min(3, "La dirección debe tener al menos 3 caracteres"),
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
        const userUpdate = await updateUser(userId, userToken, {
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          businessName: values.businessName
        });

        const formData = new FormData();
        formData.append("businessName", values.businessName);
        formData.append("address", values.address);
        formData.append("city", values.city);
        formData.append("country", values.country);
        formData.append("businessType", values.businessType);

        if (values.imageURL instanceof File) {
          formData.append("imageURL", values.imageURL);
        } else if (values.imageURL instanceof Blob) {
          const file = new File([values.imageURL], "business_image.jpg", { type: values.imageURL.type });
          formData.append("imageURL", file);
        }

        const businessUpdate = await updateBusiness(businessId, userToken, {
          businessName: values.businessName,
          address: values.address,
          city: values.city,
          country: values.country,
          businessType: values.businessType,
          imageURL: values.imageURL
        });

        if (userUpdate && businessUpdate) {
          localStorage.setItem("businessName", values.businessName); //Esto lo hago para que Cambie el nombre del negocio en myDiscounts
          localStorage.setItem("businessType", values.businessType);
          setBusinessName(values.businessName);
          setBusinessType(values.businessType);
          setTimeout(() => {
            router.push("/myDiscounts");
          }, 2000);
        } else {
          setError("Error al actualizar los datos.");
        }
      } catch (err) {
        setError("Error de red o el servidor no está disponible.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (!dataLoaded) {
    return <div>Cargando datos...</div>;  // Display loading state while data is being fetched
  }

  console.log("Formik Values:", formik.values);

  return (
    <div>
      <form className="flex flex-col items-center mx-auto gap-6 px-4" onSubmit={formik.handleSubmit}>
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
        {formik.touched.name && formik.errors.name ? <p className="text-red-700">{formik.errors.name}</p> : null}

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
        {formik.touched.lastName && formik.errors.lastName ? <p className="text-red-700">{formik.errors.lastName}</p> : null}

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
        {formik.touched.businessName && formik.errors.businessName ? <p className="text-red-700">{formik.errors.businessName}</p> : null}

        <div className="w-full">
          <label htmlFor="businessType" className="text-sm ml-[15px] font-medium text-black">Tipo de negocio</label>
          <select
            id="businessType"
            name="businessType"
            value={formik.values.businessType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full h-[60px] px-3 border border-[#FD7B03] bg-white rounded-[30px] shadow-sm focus:outline-none focus:ring-[#FD7B03] focus:border-[#FD7B03] sm:text-sm"
          >
            <option value="" label="Seleccionar tipo de negocio" />
            <option value="Restaurantes" label="Restaurante" />
            <option value="Bares" label="Bar" />
            <option value="Panaderías" label="Panadería" />
            <option value="Pizzerías" label="Pizzería" />
          </select>
          {formik.touched.businessType && formik.errors.businessType ? <p className="text-red-700">{formik.errors.businessType}</p> : null}
        </div>

        <Input
          label="Dirección del negocio"
          placeholder=""
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.address && formik.errors.address ? <p className="text-red-700">{formik.errors.address}</p> : null}

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
        {formik.touched.city && formik.errors.city ? <p className="text-red-700">{formik.errors.city}</p> : null}

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
        {formik.touched.country && formik.errors.country ? <p className="text-red-700">{formik.errors.country}</p> : null}

        <Input
          label="Correo electrónico"
          placeholder=""
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? <p className="text-red-700">{formik.errors.email}</p> : null}

        <Input
          label="Teléfono"
          placeholder=""
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? <p className="text-red-700">{formik.errors.phone}</p> : null}

        <div className="w-full ">
          <label htmlFor="imageURL" className="text-sm ml-[15px] font-medium text-black">Imagen del negocio</label>
          <div className="mt-1 flex items-center w-full h-[60px] px-3 border border-[#FD7B03] bg-white rounded-[30px] shadow-sm focus:outline-none focus:ring-[#FD7B03] focus:border-[#FD7B03] sm:text-sm">
            <input
              id="imageURL"
              name="imageURL"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("imageURL", event.currentTarget.files ? event.currentTarget.files[0] : null);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.imageURL && formik.errors.imageURL ? <p className="text-red-700">{formik.errors.imageURL}</p> : null}
        </div>

        {error && <p className="text-red-700">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 h-[60px] rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91] cursor-pointer"
          disabled={isLoading}
        >
          <div className="flex justify-center">
              <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
              {isLoading ? "Actualizando..." : "Actualizar"}
              </div>
            </div>
        </button>
      </form>
    </div>
  );
};

export default FormEditUserAndBusiness; */




//Este venia funcionando pero le agregue algunas cosas para que persistan los datos al refrescar pagina
import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import {
  getUserById,
  updateUser,
  getBusinessById,
  updateBusiness,
} from "@/services/apiCall";
import Input from "@/components/InputAuth/Input";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";

interface FormEditUserAndBusinessProps {
  businessId: string;
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

const FormEditUserAndBusiness: React.FC<FormEditUserAndBusinessProps> = () => {
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
  const { userId, businessId, setBusinessName, setBusinessType, isLoggedIn, userToken, setUserToken, setUserRole, setUserId, setUserName, setBusinessId, setSelectedOption } =
    useContext(Context);
  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);

      const cookieUserRole = Cookies.get('userRole') || '';
      setUserRole(cookieUserRole); 
    }
  }, [isLoggedIn, setUserToken, setUserRole]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await getUserById(userId, userToken);
        const fetchedBusiness = await getBusinessById(businessId, userToken);

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


  //A este useEffect lo creé para cuando se refresca la vista de este componente
  useEffect(() => {
    try {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get('userRole') || '';
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

}, [setUserToken,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessName,
    setBusinessId,
    setBusinessType,
    setSelectedOption
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
        const userUpdate = await updateUser(userId, userToken, {
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          businessName: values.businessName,
          businessType: values.businessType,
        });

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

        const businessUpdate = await updateBusiness(
          businessId,
          userToken,
          formData
        );

        //ARREGLAR ESTO DE ABAJO CAMBIANDO LOCALSTORAGE POR COOKIES................................
        if (userUpdate && businessUpdate) {
          const cookieBusinessName = Cookies.get("businessName") || "";
          setBusinessName(cookieBusinessName);

          const cookieBusinessType = Cookies.get("businessType") || "";
          setBusinessType(cookieBusinessType);
          
          setTimeout(() => {
            router.push("/myDiscounts");
          }, 2000);
        } else {
          setError("Error al actualizar los datos.");
        }
      } catch (err) {
        setError("Error de red o el servidor no está disponible.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (!dataLoaded) {
    return <div><p className="text-center">Cargando datos...</p></div>; // Display loading state while data is being fetched
  }

  console.log("Formik Values:", formik.values);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-6 px-4"
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

        <Input
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

        

        <div className="w-full ">
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
        </div>

        {/* <button
          type="submit"
          className="bg-[#FF9900] text-white w-[334px] h-[60px] rounded-[30px] text-xl border-[#FF9900] border-2 mt-[15px] mx-[15px] mb-[5px] focus:outline-none hover:bg-[#FF9900]"
          disabled={formik.isSubmitting || isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </button> */}

        <Button buttonText={isLoading ? "Guardando..." : "Guardar cambios"} />

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditUserAndBusiness;
