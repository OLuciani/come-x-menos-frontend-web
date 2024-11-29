"use client"
import React, {useContext} from "react";
import { Krona_One } from "next/font/google";
import FormEditDiscount from "@/components/dashboardBusinessAdminComponents/myActiveDiscounts/discountEdit/DiscountEditForm";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';
import { Context } from "@/context/Context";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

interface DiscountEditPageProps {
    setShowDiscountEdit: (showDiscountEdit: boolean) => void;
    setShowDiscountActionPage: (showDiscountActionPage: boolean) => void;
  }

//export default function DiscountEdit() {
const DiscountEdit: React.FC<DiscountEditPageProps> = ({ setShowDiscountEdit, setShowDiscountActionPage }) => {
  const { setSelectedOption } = useContext(Context);

  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-full relative">
        <div className="w-full flex flex-col justify-center items-center">
            <FaArrowLeft 
                size={20} 
                color="black" 
                onClick={() => [
                    setSelectedOption("Mi cuenta"),
                    setShowDiscountEdit(false)
                ]}

                className="absolute top-3 left-3 custom-w-450:top-6 custom-w-450:left-6 cursor-pointer"
            />
            
            <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto mt-8 lg:mt-2">
                <h1 className={`${krona.className} mb-5 text-2xl custom-w-450:text-3xl text-[gray] text-center`}>Editar descuento</h1>
                <p className="text-center text-[14px] font-semibold mt-4">(No puedes editar el tiempo de duración del descuento)</p>
                <div className="items-center justify-center pb-[3%]">
                <FormEditDiscount setShowDiscountActionPage={setShowDiscountActionPage}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DiscountEdit;