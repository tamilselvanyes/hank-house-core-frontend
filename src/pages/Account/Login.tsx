import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { loginUser } from "../../utils/helpers";
import InputTextComponent from "../../components/InputTextComponent";
import PasswordTextComponent from "../../components/PasswordTextComponent";
import loginImage from "../../assets/images/image-login.jpg";
import { BiLogoGmail } from "react-icons/bi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!userName || !password) {
        toast.error('Username and password are required');
        return;
      }

      const response = await loginUser(userName, password);

      if (response && response.data.error) {
        toast.error(`Login failed: ${response.data.error}`);
        return;
      }

      if (response) {
        toast.success('Login successful!');
        setCookie("token", response.data.accessToken);
        setCookie("user_id", response.data.id);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(`An error occurred during login: ${error.message}`);
    }
  };

  return (
    <div className="flex mt-10 gap-8 bg-[#E5FAED] px-12 py-12 rounded-lg">
      <div>
        <img
          src={loginImage}
          alt="login side asset"
          className="object-cover w-96 h-[100%]"
        />
      </div>
      <div className="flex flex-col gap-7 mt-14">
        <h1 className="text-3xl text-center">Login</h1>

        <div className="flex flex-row items-center justify-center lg:justify-start">
          <p className="mb-0 mr-4 text-lg">Sign in with</p>

          <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <BiLogoGmail />
          </button>
        </div>

        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-black">
            Or
          </p>
        </div>
        <h6>Please enter your username and password</h6>
        <InputTextComponent
          value={userName}
          label="Username"
          placeHolder="you@example.com"
          setValue={setUserName}
        />
        <PasswordTextComponent
          label="Password"
          password={password}
          setPassword={setPassword}
        />
        <div className="w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="font-serif font-thin mt-2 italic">
            Need an account?
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
