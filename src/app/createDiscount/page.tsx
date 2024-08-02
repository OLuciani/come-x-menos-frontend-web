import React from "react";
import { Krona_One } from "next/font/google";
import FormCreateDiscount from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function CreateDiscountPage() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className={`${krona.className} my-5 text-[22px] text-[gray] text-center`}>Crear un descuento</h1>
        <div className="items-center justify-center pb-[3%]">
          <FormCreateDiscount />
        </div>
      </div>
    </div>
  );
}