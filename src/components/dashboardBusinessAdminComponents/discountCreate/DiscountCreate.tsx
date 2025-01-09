"use client"
import React, {useContext} from "react";
import { Krona_One } from "next/font/google";
import DiscountCreateForm from "@/components/dashboardBusinessAdminComponents/discountCreate/DiscountCreateForm";
//import { FaArrowLeft } from 'react-icons/fa';
import { Context } from "@/context/Context";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

interface DiscountCreateProps {
    setSection: (section: string) => void;
    section: string;
}

const DiscountCreate: React.FC<DiscountCreateProps> = ({ setSection, section }) => {
  const { setSelectedOption } = useContext(Context);
  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-full relative">
        <div className="w-full flex flex-col justify-center items-center">
            {/*  <FaArrowLeft 
                size={20} 
                color="black" 
                onClick={() => [
                    setSelectedOption("Mi cuenta"),
                    setShowDiscountDelete(false)
                ]}

                className="absolute top-3 left-3 custom-w-450:top-6 custom-w-450:left-6 cursor-pointer"
            /> */}

            <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
                <h1 className={`${krona.className} my-5 text-[22px] text-[black] font-semibold text-center`}>Crear un descuento</h1>
                <div className="items-center justify-center pb-[3%]">
                <DiscountCreateForm setSection={setSection} section={section}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DiscountCreate;