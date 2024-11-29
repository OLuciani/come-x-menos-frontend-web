"use client"
import React, { useContext } from "react";
import { Context } from "@/context/Context";
import { Krona_One } from "next/font/google";
import DiscountDeleteForm from "@/components/dashboardBusinessAdminComponents/myActiveDiscounts/discountDelete/DiscountDeleteForm";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

interface DiscountEditPageProps {
    setShowDiscountDelete: (showDiscountDelete: boolean) => void;
    setShowDiscountActionPage: (showDiscountActionPage: boolean) => void;
  }

//export default function DiscountDelete() {
const DiscountDelete: React.FC<DiscountEditPageProps> = ({ setShowDiscountDelete, setShowDiscountActionPage }) => {
  const { setSelectedOption, selectDiscountTitle } = useContext(Context);

  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-full relative">
        <div className="w-full flex flex-col justify-center items-center">
            <FaArrowLeft 
                size={20} 
                color="black" 
                onClick={() => [
                    setSelectedOption("Mi cuenta"),
                    setShowDiscountDelete(false)
                ]}

                className="absolute top-3 left-3 custom-w-450:top-6 custom-w-450:left-6 cursor-pointer"
            />

            <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
                <p className={`${krona.className} mt-10 xl:mt-20 text-[22px] md:text-[30px] p-5 text-red-500 text-center`}>Estás a punto de eliminar el descuento: <p className="text-blue-500">{selectDiscountTitle}</p></p>
                <div className="items-center justify-center pb-[3%]">
                <DiscountDeleteForm setShowDiscountActionPage={setShowDiscountActionPage}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DiscountDelete;