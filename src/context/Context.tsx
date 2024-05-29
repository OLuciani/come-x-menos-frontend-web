"use client";
import React, { createContext, useState, ReactNode } from "react";

interface ContextProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  newRole: string;
  setNewRole: React.Dispatch<React.SetStateAction<string>>;
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
}

export const Context = createContext<ContextProps>({
  userId: "",
  setUserId: () => {},
  newRole: "",
  setNewRole: () => {},
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
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  
const [userId, setUserId] = useState<string>("");
const [newRole, setNewRole] = useState<string>("");
const [userToken, setUserToken] = useState<string>("");
const [userName, setUserName] = useState<string>("");
const [backgroundButtonNavBar, setBackgroundButtonNavBar] = useState<boolean>(false);
const [businessName, setBusinessName] = useState<string>("");
const [businessId, setBusinessId] = useState<string>("");
const [businessType, setBusinessType] = useState<string>("");
  
  return (
    <Context.Provider
      value={{
        userId,
        setUserId,  
        newRole, 
        setNewRole,
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
        setBusinessType
      }}
    >
      {children}
    </Context.Provider>
  );
}