"use client"
import React, { useContext, useEffect } from "react";
import { Context } from "@/context/Context";


const MyDiscountsPage = () => {
  const { userId, setUserId, newRole, setNewRole, userToken, setUserToken, setUserName } =
  useContext(Context);
  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");

    if (thereIsUserToken/*  !== null */) {
      setUserToken(thereIsUserToken);
    }

    if (thereIsUserRole ) {
      setNewRole(thereIsUserRole);
    }

    if(thereIsUserId) {
      setUserId(thereIsUserId);
    }  

    if(thereIsUserName) {
      setUserName(thereIsUserName);
    }
  }, []);

  return (
    <div>
        <h1 className='mt-5 text-3xl text-center pb-5'>Mis descuentos</h1>
    </div>
  )
}

export default MyDiscountsPage;