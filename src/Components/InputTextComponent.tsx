import React from 'react';

interface InputBoxProps {
  label: string;
  value: string;
  helperText?: string;
  placeHolder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const InputTextComponent = ({
  value,
  setValue,
  label,
  helperText,
  placeHolder,
}: InputBoxProps) => {
  return (
    <div>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          {label}
        </span>
        <input
          type="email"
          name="email"
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder={placeHolder}
        />
        <p className="mt-2 text-sm">{helperText}</p>
      </label>
    </div>
  );
};

export default InputTextComponent;
