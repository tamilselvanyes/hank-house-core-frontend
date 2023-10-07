import React from 'react';

interface PasswordTextBoxProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  label:string
}
const PasswordTextComponent = ({
  password,
  setPassword,
  label
}: PasswordTextBoxProps) => {
  return (
    <div>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          {label}
        </span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        />
      </label>
    </div>
  );
};

export default PasswordTextComponent;
