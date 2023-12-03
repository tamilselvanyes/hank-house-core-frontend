// ProfilePage.jsx
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice';
import { selectAppContainerState } from '../AppContainer/slice/selector';
import { useCookies } from 'react-cookie';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

const ProfilePage: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const disptach = useDispatch();
  const { appContainerActions } = useAppContainerSlice();
  const appContainerStates = useSelector(selectAppContainerState);
  const { address, userData } = appContainerStates;

  // State to store address information
  const [addressData, setAddressData] = useState<Address>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: true,
  });

  // Function to handle address form submission
  const handleAddressSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = cookies.user_id;
    // You can handle the submission logic here (e.g., send data to a server)
    const addressBody = {
      ...addressData,
      userId: userId,
    };
    disptach(appContainerActions.addNewAddress(addressBody));
  };

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  useEffect(() => {
    const userId = cookies.user_id;
    disptach(appContainerActions.getAddress(userId));
  }, []);
  console.log('addressData----> in profile', addressData);
  return (
    <div className="container mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
      <div className="bg-[#245114] text-white text-center py-2 rounded-t-md">
        <h2 className="text-2xl font-semibold">
          Profile Information
        </h2>
      </div>
      <div className="mb-2">
        <p className="text-lg font-medium">
          Name: {cookies.username}
        </p>
        <p className="text-lg font-medium">Email: {cookies.email}</p>
      </div>
      <div className="mb-4">
        <p>Addresses Added:</p>
        <ol>
          {address.map((add: any) => (
            <li>
              "{add.street}, {add.city}, {add.state}, {add.country} -{' '}
              {add.postalCode}"
            </li>
          ))}
        </ol>
        {/* <p>"Unit 315, hemlock st, wat, on, CA - N2l0k8"</p> */}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Add New Address
        </h3>
        <form
          onSubmit={handleAddressSubmit}
          className="border p-4 rounded-md bg-white"
          style={{ borderColor: '#245114' }}
        >
          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-600"
            >
              Street:
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={addressData.street}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={addressData.city}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={addressData.state}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-600"
            >
              Postal Code:
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={addressData.postalCode}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-600"
            >
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={addressData.country}
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
