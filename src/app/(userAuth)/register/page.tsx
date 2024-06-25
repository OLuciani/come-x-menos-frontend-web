import React from "react";
import { Krona_One } from "next/font/google";
import FormRegister from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function RegisterPage() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full sm:w-[500px] px-8 pb-4 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className={`${krona.className} my-2 text-[34px] text-[#FD7B03] text-center`}>Comé x menos</h1>
        <h2 className="text-center text-2xl font-semibold mt-4 text-[#FD7B03]">Registrarse</h2>
        <div className="items-center justify-center pb-[3%]">
          <FormRegister />
        </div>
      </div>
    </div>
  );
}
