"use client"
import React, {useContext} from "react";
import { Krona_One } from "next/font/google";
import FormCreateDiscount from "./form";
import { FaArrowLeft } from 'react-icons/fa';
import Link from "next/link";
import { Context } from "@/context/Context";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function CreateDiscountPage() {
  const { setSelectedOption } = useContext(Context);
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-screen mt-10 ml-5 md:ml-10">
        <Link
          href={"/dashboard"}
          onClick={() => setSelectedOption("Mi cuenta")}
        >
          <FaArrowLeft size={20} color="black" />
        </Link>
      </div>

      <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className={`${krona.className} my-5 text-[22px] text-[gray] text-center`}>Crear un descuento</h1>
        <div className="items-center justify-center pb-[3%]">
          <FormCreateDiscount />
        </div>
      </div>
    </div>
  );
}