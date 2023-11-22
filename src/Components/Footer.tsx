import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <div className="footer-section">
          <h4 className="text-lg font-bold mb-2">Account</h4>
          <ul className="list-none p-0">
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate('/login');
              }}
            >
              Log in
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate('/register');
              }}
            >
              Sign up
            </li>
            <li>Redeem a Gift Card</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="text-lg font-bold mb-2">Company</h4>
          <ul className="list-none p-0">
            <li>About</li>
            <li>Environmental Initiatives</li>
            <li>Factories</li>
            <li>DEI</li>
            <li>Careers</li>
            <li>International</li>
            <li>Accessibility</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="text-lg font-bold mb-2">Get Help</h4>
          <ul className="list-none p-0">
            <li>Help Center</li>
            <li>Return Policy</li>
            <li>Shipping Info</li>
            <li>Bulk Orders</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="text-lg font-bold mb-2">Connect</h4>
          <ul className="list-none p-0">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Affiliates</li>
            <li>Our Stores</li>
          </ul>
        </div>

        {/* New Section for Email Submission */}
        <div className="footer-section">
          <h4 className="text-lg font-bold mb-2">Subscribe</h4>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-700 text-white p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <p className="mt-4 text-center">© 2023 All rights reserved.</p>
    </footer>
  );
};

export default Footer;
