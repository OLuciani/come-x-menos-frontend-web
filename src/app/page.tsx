"use client"
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Context } from "@/context/Context";


export default function Home() {
  const { userId, setUserId, userRole, setUserRole, userToken, setUserToken, setUserName, setBackgroundButtonNavBar } =
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
      setUserRole(thereIsUserRole);
    }

    if(thereIsUserId) {
      setUserId(thereIsUserId);
    }  

    if(thereIsUserName) {
      setUserName(thereIsUserName);
    }
    
    if(!userToken) {
      setBackgroundButtonNavBar(false);
    }
  }, [setBackgroundButtonNavBar, setUserId, setUserName, setUserRole, setUserToken, userToken]);
  
  console.log(userId);
  return (
    <main className="">
      <div className="w-full mt-[2%]">
        <h1 className="text-center text-4xl text-blue-600 font-bold">Hola</h1>
      </div>
    </main>
  );
}
