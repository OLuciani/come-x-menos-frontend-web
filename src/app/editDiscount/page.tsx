"use client"
import React, {useContext} from "react";
import { Krona_One } from "next/font/google";
import FormEditDiscount from "./form";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';
import { Context } from "@/context/Context";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function EditDiscountPage() {
  const { setSelectedOption } = useContext(Context);

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-screen mt-10 ml-10 md:ml-20">
        <Link
          href={"/discountDetail"}
          onClick={() => setSelectedOption("Mi cuenta")}
        >
          <FaArrowLeft size={20} color="black" />
        </Link>
      </div>
      
      <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className={`${krona.className} my-5 text-2xl custom-w-450:text-3xl text-[gray] text-center`}>Editar descuento</h1>
        <p className="text-center text-[14px] font-semibold mt-4">(No puedes editar el tiempo de duración del descuento)</p>
        <div className="items-center justify-center pb-[3%]">
          <FormEditDiscount />
        </div>
      </div>
    </div>
  );
}
