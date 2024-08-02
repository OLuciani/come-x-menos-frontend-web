import React from "react";
import { Krona_One } from "next/font/google";
import DeleteDiscountForm from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function DeleteDiscountPage() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className={`${krona.className} mt-16 text-[22px] md:text-[30px] p-5 text-red-500 text-center`}>Estás a punto de eliminar el descuento</h1>
        <div className="items-center justify-center pb-[3%]">
          <DeleteDiscountForm />
        </div>
      </div>
    </div>
  );
}
