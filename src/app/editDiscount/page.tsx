import React from "react";
import { Krona_One } from "next/font/google";
import FormEditDiscount from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function EditDiscountPage() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className={`${krona.className} my-5 text-2xl custom-w-450:text-3xl text-[gray] text-center`}>Editar descuento</h1>
        {/* <h2 className="text-center text-2xl font-semibold mt-4 text-[#FD7B03]">Registrarse</h2> */}
        <div className="items-center justify-center pb-[3%]">
          <FormEditDiscount />
        </div>
      </div>
    </div>
  );
}
