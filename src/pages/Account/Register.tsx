import React, { useState } from 'react';
import { registerUser } from '../../utils/helpers';
import InputTextComponent from '../../components/InputTextComponent';
import PasswordTextComponent from '../../components/PasswordTextComponent';
import loginImage from '../../assets/images/image-login.jpg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async () => {
    toast.dismiss(); // Dismiss any existing toasts

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        if (!email || !password || !userName || !role) {
          toast.error('All fields are required');
          return;
        }

        const response = await registerUser(
          email,
          password,
          userName,
          role
        );
        console.log('registered user', response);
        toast.success('User registered successfully');
        navigate('/login');
      } catch (error: any) {
        console.error(
          'An error occurred during registration:',
          error.message
        );
        toast.error('An error occurred during registration');
      }
    }
  };

  return (
    <div className="flex mt-10 gap-8 bg-[#E5FAED] px-12 py-14 rounded-lg">
      <div>
        <img
          src={loginImage}
          alt="login side asset"
          className="object-cover w-96 h-[100%]"
        />
      </div>
      <div className="flex flex-col gap-7 mt-14">
        <h1 className="text-3xl text-center">Register</h1>
        <h6>Please enter your username and password</h6>
        <InputTextComponent
          value={userName}
          label="Username"
          setValue={setEmail}
        />
        <InputTextComponent
          value={email}
          label="Email"
          placeHolder="you@example.com"
          setValue={setUserName}
        />
        {/* Add the role selection if needed */}
        {/* <div>
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Role
          </label>
          <select
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
