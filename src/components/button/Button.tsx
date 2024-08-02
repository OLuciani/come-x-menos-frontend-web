import React from 'react';

interface ButtonProps {
  buttonText: string;
  onClickButton?: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClickButton }) => {
  return (
    <button
      type="submit"
      className="w-full bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 h-[50px] rounded-[10px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91] cursor-pointer"
      onClick={onClickButton}
    >
      <div className="flex justify-center">
        <div className="w-[98.5%] bg-[#FD7B03] rounded-[10px] py-[3px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
          {buttonText}
        </div>
      </div>
    </button>
  );
}

export default Button;
