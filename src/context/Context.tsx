"use client";
import React, { createContext, useState, ReactNode } from "react";
import {  DiscountDetail } from "@/services/apiCall";

interface ContextProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  backgroundButtonNavBar: boolean;
  setBackgroundButtonNavBar: React.Dispatch<React.SetStateAction<boolean>>;
  businessName: string;
  setBusinessName: React.Dispatch<React.SetStateAction<string>>;
  businessId: string;
  setBusinessId: React.Dispatch<React.SetStateAction<string>>;
  businessType: string;
  setBusinessType: React.Dispatch<React.SetStateAction<string>>;
  discountId: string;
  setDiscountId: React.Dispatch<React.SetStateAction<string>>;
  discountRecovered: DiscountDetail | null;
  setDiscountRecovered: React.Dispatch<React.SetStateAction<DiscountDetail | null>>;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextProps>({
  userId: "",
  setUserId: () => {},
  userRole: "",
  setUserRole: () => {},
  userToken: "",
  setUserToken: () => {},
  userName: "",
  setUserName: () => {},
  backgroundButtonNavBar: false,
  setBackgroundButtonNavBar: () => {},
  businessName: "",
  setBusinessName: () => {},
  businessId: "",
  setBusinessId: () => {},
  businessType: "",
  setBusinessType: () => {},
  discountId: "",
  setDiscountId: () => {},
  discountRecovered: null,
  setDiscountRecovered: () => {},
  selectedOption: "",
  setSelectedOption: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  
const [userId, setUserId] = useState<string>("");
const [userRole, setUserRole] = useState<string>("");
const [userToken, setUserToken] = useState<string>("");
const [userName, setUserName] = useState<string>("");
const [backgroundButtonNavBar, setBackgroundButtonNavBar] = useState<boolean>(false);
const [businessName, setBusinessName] = useState<string>("");
const [businessId, setBusinessId] = useState<string>("");
const [businessType, setBusinessType] = useState<string>("");
const [discountId, setDiscountId] = useState<string>("");
const [discountRecovered, setDiscountRecovered] = useState<DiscountDetail | null>(null);
const [selectedOption, setSelectedOption] = useState<string>("Inicio");
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  return (
    <Context.Provider
      value={{
        userId,
        setUserId,  
        userRole, 
        setUserRole,
        userToken, 
        setUserToken,
        userName, 
        setUserName,
        backgroundButtonNavBar,
        setBackgroundButtonNavBar,
        businessName, 
        setBusinessName,
        businessId, 
        setBusinessId,
        businessType, 
        setBusinessType,
        discountId, 
        setDiscountId,
        discountRecovered, 
        setDiscountRecovered,
        selectedOption, 
        setSelectedOption,
        isLoggedIn, 
        setIsLoggedIn
      }}
    >
      {children}
    </Context.Provider>
  );
}