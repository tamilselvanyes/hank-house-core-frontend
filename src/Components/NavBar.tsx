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
  BiShoppingBag,
} from "react-icons/bi";

const NavBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const token = cookies.token;
  return (
    <div className="flex justify-between items-center w-full px-5 pt-3 border-b pb-2 bg-white">
      <img
        src={logo}
        alt="Logo"
        className="w-36 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex gap-8">
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center w-full justify-center gap-1">
                <p>Categories</p>
                <BiSolidChevronDown />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-[#228706] text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                        onClick={() => {
                          navigate("/products/Men");
                        }}
                      >
                        {/* <BiUser />
                        Profile */}
                        Men
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-[#228706] text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                        onClick={() => {
                          navigate("/products/Women");
                        }}
                      >
                        Women
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-[#228706] text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                        onClick={() => {
                          navigate("/products/Kids");
                        }}
                      >
                        Kids
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <p
          className="cursor-pointer"
          onClick={() => {
            navigate("products");
          }}
        >
          Deals
        </p>
        <p
          className="cursor-pointer"
          onClick={() => {
            navigate("products");
          }}
        >
          What's New
        </p>
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
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#228706] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      <div className="flex gap-6 mr-3">
        {token ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center w-full justify-center gap-1 ">
                <BiUser />
                <p>Account</p>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-[#228706] text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                      >
                        <BiUser />
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-[#228706] text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                        onClick={() => {
                          removeCookie("token");
                        }}
                      >
                        <BiLogOut />
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div
            className="flex w-full items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            <BiLogIn />
            <p>Login</p>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center w-full justify-center gap-1 ">
                <BiCart />
                {/* <p>Account</p> */}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-[#228706] text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                        onClick={() => {
                          token ? navigate("/wishlist") : navigate("/login");
                        }}
                      >
                        <BiShoppingBag />
                        My WishList
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-[#228706] text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                        onClick={() => {
                          token ? navigate("/cart") : navigate("/login");
                        }}
                      >
                        <BiCart />
                        Cart
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
