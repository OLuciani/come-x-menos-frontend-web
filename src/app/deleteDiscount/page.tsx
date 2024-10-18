"use client"
import React, { useContext } from "react";
import { Context } from "@/context/Context";
import { Krona_One } from "next/font/google";
import DeleteDiscountForm from "./form";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function DeleteDiscountPage() {
  const { setSelectedOption, selectDiscountTitle } = useContext(Context);

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
        <h1 className={`${krona.className} mt-16 text-[22px] md:text-[30px] p-5 text-red-500 text-center`}>Estás a punto de eliminar el descuento: "{selectDiscountTitle}"</h1>
        <div className="items-center justify-center pb-[3%]">
          <DeleteDiscountForm />
        </div>
      </div>
    </div>
  );
}
