import React, { useState } from 'react';
import InputTextComponent from '../../Components/InputTextComponent';
import PasswordTextComponent from '../../Components/PasswordTextComponent';
import loginImage from '../../assets/images/image-login.jpg';

const Register = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  return (
    <div className="flex mt-10 h-screen gap-8">
      <div>
        <img
          src={loginImage}
          alt="login side asset"
          className="object-cover w-96 h-[85%]"
        />
      </div>
      <div className="flex flex-col gap-7 mt-14">
        <h1 className="text-3xl text-center">Register</h1>

        <h6>Please enter your username and password</h6>
        <InputTextComponent
          value={userName}
          label="Username"
          placeHolder="you@example.com"
          setValue={setUserName}
        />
        <PasswordTextComponent
          label="Password"
          password={confirmPassword}
          setPassword={setConfirmPassword}
        />
        <PasswordTextComponent
          label="Confirm Password"
          password={password}
          setPassword={setPassword}
        />
        <div className="w-full">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
