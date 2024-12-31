"use client"
import React, { useContext, useEffect } from 'react';
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import UserNotifications from '@/components/userNotifications/UserNotifications';

const Notifications = () => {
    const { userToken, setUserToken, isLoggedIn, userRole, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption, setUserStatus } = useContext(Context);

    useEffect(() => {
        if (isLoggedIn) {
          const storedUserToken = Cookies.get("userToken") || "";
          setUserToken(storedUserToken);
        }
      }, [isLoggedIn]);
    
      useEffect(() => {
        const storedUserToken = Cookies.get("userToken") || "";
        setUserToken(storedUserToken);
    
        const cookieUserRole = Cookies.get("userRole") || "";
        setUserRole(cookieUserRole);
    
        const cookieUserName = Cookies.get("userName") || "";
        setUserName(cookieUserName);
    
        const cookieBusinessName = Cookies.get("businessName") || "";
        setBusinessName(cookieBusinessName);
    
        const cookieBusinessType = Cookies.get("businessType") || "";
        setBusinessType(cookieBusinessType);
    
        const cookieUserStatus = Cookies.get("userStatus") || "";
        setUserStatus(cookieUserStatus);
      }, [ setBusinessName, setBusinessType, setUserName, setUserRole, setUserStatus]);
    
  return (
    <div> 
        <UserNotifications />
    </div>
  )
}

export default Notifications;