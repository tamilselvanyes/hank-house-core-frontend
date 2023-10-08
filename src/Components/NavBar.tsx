import React from 'react';
import logo from '../assets/images/Logo.svg';
import chevronDown from '../assets/images/chevron-down.svg';
import shoppingCart from '../assets/images/shopping-cart.svg';
import userIcon from '../assets/images/user.svg';

const NavBar = () => {
  return (
    <div className="flex justify-between items-center w-full mx-2">
      <img src={logo} alt="Logo" />
      <div className="flex gap-8">
        <div className="flex">
          <p>Categories</p>
          <img
            src={chevronDown}
            alt="chevron down"
            className="h-[24px]"
          />
        </div>
        <p>Deals</p>
        <p>What's New</p>
      </div>
      <div className="relative">
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
          className="block p-4 pl-10 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div className="flex">
        <div className="flex">
          <img src={userIcon} alt="user" className="h-[24px]" />
          <p>Account</p>
        </div>
        <div className="flex">
          <img src={shoppingCart} alt="cart" className="h-[24px]" />
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
