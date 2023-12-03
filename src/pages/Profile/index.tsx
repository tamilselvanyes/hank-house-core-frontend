// ProfilePage.jsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const ProfilePage: React.FC = () => {
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  // State to store address information
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  // Function to handle address form submission
  const handleAddressSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle the submission logic here (e.g., send data to a server)
    console.log('Address submitted:', address);
  };

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
      <div className="bg-[#245114] text-white text-center py-2 rounded-t-md">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium">Name: {userData.name}</p>
        <p className="text-lg font-medium">Email: {userData.email}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Address Information</h3>
        <form
          onSubmit={handleAddressSubmit}
          className="border p-4 rounded-md bg-white"
          style={{ borderColor: '#245114' }}
        >
          <div className="mb-4">
            <label htmlFor="street" className="block text-sm font-medium text-gray-600">
              Street:
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={address.street}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-600">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-600">
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-600">
              Postal Code:
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={address.postalCode}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-600">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-[#245114] text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-70"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
