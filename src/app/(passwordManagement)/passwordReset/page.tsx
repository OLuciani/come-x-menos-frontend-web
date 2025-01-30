import { Krona_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import PasswordResetForm from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });
const PasswordResetPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <PasswordResetForm />
    </div>
  );
};

export default PasswordResetPage;