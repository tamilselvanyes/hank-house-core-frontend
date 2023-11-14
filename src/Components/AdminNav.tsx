import { Fragment } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";

import logo from "../assets/images/Logo.svg";
import {
  BiLogIn,
  BiLogOut,
  BiUser,
  BiCart,
  BiSolidChevronDown,
} from "react-icons/bi";

import { GiHamburgerMenu } from "react-icons/gi";

import { MdAccountBox } from "react-icons/md";

import { VscGraph } from "react-icons/vsc";

import { RiExchangeDollarLine } from "react-icons/ri";

import { LiaUsersSolid } from "react-icons/lia";

import { MdToday } from "react-icons/md";

const AdminNav = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const token = cookies.token;
  return (
    <div className="bg-[#eaeaea] w-full">
      <div className="flex justify-between items-center w-full px-5 mt-3 border-b pb-2 bg-[white]">
        <div className="flex items-center">
          <GiHamburgerMenu className="w-[40px] h-[40px]" />
          <img
            src={logo}
            alt="Logo"
            className="w-40 cursor-pointer mt-[-10px]"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        <div className="relative ">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-96 text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Product"
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        <div className="flex gap-6 mr-3">
          <div className="flex items-center gap-1">
            <MdAccountBox className="w-[40px] h-[40px]" />
          </div>
        </div>
      </div>
      <div className="h-60 w-full bg-[green]">
        <div className="flex pt-[2rem] w-3/4 mx-auto mb-[4rem] justify-between">
          <button className="bg-[white] rounded-lg font-bold px-[1.5rem] text-[1.15rem]">
            Create Product
          </button>
          <h2 className="font-bold text-white text-[2rem]">
            Hank's House Admin
          </h2>
        </div>
        <div className="flex gap-20 justify-between w-3/4 mx-auto">
          <div className="bg-[white] w-[250px] h-[200px] rounded-lg pl-[1rem] flex flex-col justify-center">
            <VscGraph className="w-[70px] h-[70px]" />
            <h2 className="text-[1.75rem] font-bold">Total Sales</h2>
            <h2 className="text-[1.75rem] font-semibold">716248</h2>
          </div>
          <div className="bg-[white] w-[250px] h-[200px] rounded-lg pl-[1rem] flex flex-col justify-center">
            <RiExchangeDollarLine className="w-[70px] h-[70px]" />
            <h2 className="text-[1.75rem] font-bold">Total Revenue</h2>
            <h2 className="text-[1.75rem] font-semibold">$216,871.76</h2>
          </div>
          <div className="bg-[white] w-[250px] h-[200px] rounded-lg pl-[1rem] flex flex-col justify-center">
            <LiaUsersSolid className="w-[70px] h-[70px]" />
            <h2 className="text-[1.75rem] font-bold">Total Users</h2>
            <h2 className="text-[1.75rem] font-semibold">4564</h2>
          </div>
          <div className="bg-[white] w-[250px] h-[200px] rounded-lg pl-[1rem] flex flex-col justify-center">
            <MdToday className="w-[70px] h-[70px]" />
            <h2 className="text-[1.75rem] font-bold">Total Sales</h2>
            <h2 className="text-[1.75rem] font-semibold">716248</h2>
          </div>
        </div>
      </div>
      <div className=" w-3/4 h-screen bg-[white] mx-auto mt-[10rem] rounded-lg">
        <h2 className="text-[1.75rem] font-bold p-[1rem]">Active Products</h2>
        <div className="w-4/4 bg-[#eaeaea] text-[1.25rem] font-semibold">
          <div className="flex w-3/4 m-auto justify-between">
            <h3>Product Name</h3>
            <div className="flex justify-around w-2/4">
              <h3>Sold</h3>
              <h3>Available</h3>
              <h3>Price</h3>
            </div>
          </div>
        </div>
        <div className="flex w-3/4 m-auto justify-between">
          <h3>Panchu Kattu Saree</h3>
          <div className="flex justify-around w-2/4">
            <h3>653</h3>
            <h3>1000</h3>
            <h3>$50</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
