/* import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  extra?: string;
  name: string;
  minLength?: number;
  value?: string | File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
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
      <span className="flex justify-between text-sm font-normal text-[#FD7B03] pb-1">
        <label htmlFor={name} className="text-sm ml-[15px] font-medium text-black">
          {label}
        </label>
        {extra}
      </span>
      {type === "file" ? (
        <label
          className={`border border-[#FD7B03] rounded-[30px] text-sm h-[60px] px-3 flex items-center justify-center outline-none ${
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
              <span className="min-w-32 border-[2px] border-[#FD7B03] rounded-lg px-2 py-1 hover:bg-[#FD7B03] hover:text-white cursor-pointer">Elegir archivo...</span>
              <div className="w-2/3 text-center truncate overflow-hidden">          
                <span className="w-full">{value instanceof File ? value.name : value}</span>
              </div>
            </div>
          ) : (

            <span className="border-[2px] border-[#FD7B03] rounded-lg px-4 py-1 hover:bg-[#FD7B03] hover:text-white cursor-pointer">Elegir archivo...</span>
          )}
        </label>
      ) : (
        <input
          id={name}
          className="border border-[#FD7B03] rounded-[30px] text-sm h-[60px] px-3 outline-none"
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

export default Input; */


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
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
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
      <span className="flex justify-between text-sm font-normal text-[#FD7B03] pb-1">
        <label htmlFor={name} className="text-sm ml-[15px] font-medium text-black">
          {label}
        </label>
        {extra}
      </span>
      {type === "file" ? (
        <label
          className={`border border-[#FD7B03] rounded-[30px] text-sm h-[60px] px-3 flex items-center justify-center outline-none ${
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
              <span className="min-w-32 border-[2px] border-[#FD7B03] rounded-lg px-2 py-1 hover:bg-[#FD7B03] hover:text-white cursor-pointer">Elegir archivo...</span>
              <div className="w-2/3 text-center truncate overflow-hidden">
                <span className="w-full">{value instanceof File ? value.name : "Archivo seleccionado"}</span>
              </div>
            </div>
          ) : (
            <span className="border-[2px] border-[#FD7B03] rounded-lg px-4 py-1 hover:bg-[#FD7B03] hover:text-white cursor-pointer">Elegir archivo...</span>
          )}
        </label>
      ) : (
        <input
          id={name}
          className="border border-[#FD7B03] rounded-[30px] text-sm h-[60px] px-3 outline-none"
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
