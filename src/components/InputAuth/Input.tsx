import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  extra?: string;
  name: string;
  minLength?: number;
  value?: string | File | Blob | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  extraOnClick?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  extra,
  label,
  placeholder,
  type,
  name,
  minLength,
  value,
  onBlur,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full mt-3">
      <span className="flex justify-between text-sm font-normal pb-1">
        <label htmlFor={name} className="text-sm ml-[15px] font-medium text-black">
          {label}
        </label>
        {extra}
      </span>
      {type === "file" ? (
        <label
          className={`border border-[gray] rounded-[10px] text-sm h-[50px] px-3 flex items-center justify-center ${
            value ? "file-selected" : ""
          }`}
        >
          <input
            id={name}
            type={type}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            accept=".jpg, .jpeg, .png"
            className="hidden"
          />
          {value ? (
            <div className="w-full flex flex-row items-center gap-2">
              <span className="min-w-32 border-[1px] border-[gray] rounded-lg px-2 py-1 hover:bg-[gray] hover:text-white cursor-pointer">Elegir archivo...</span>
              <div className="w-2/3 text-center truncate overflow-hidden">
                <span className="w-full">{value instanceof File ? value.name : "Archivo seleccionado"}</span>
              </div>
            </div>
          ) : (
            <span className="border-[1px] border-[gray] rounded-lg px-4 py-1 hover:bg-[gray] hover:text-white cursor-pointer">Elegir archivo...</span>
          )}
        </label>
      ) : (
        <input
          id={name}
          className="border border-[gray] rounded-[10px] h-[50px] px-3 focus:outline-none focus:border-[2px]"
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          minLength={minLength}
          value={value as string}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

export default Input;
