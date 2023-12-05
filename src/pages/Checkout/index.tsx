import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderSummary from '../../components/OrderSummary';
import {
  PayPalScriptProvider,
  PayPalButtons,
} from '@paypal/react-paypal-js';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice';
import { selectAppContainerState } from '../AppContainer/slice/selector';

interface FormValues {
  firstName: string;
  email: string;
  address: string;
  deliveryDate: string;
}

// interface CartItem {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
// }

// Define a type for the 'link' object
interface PayPalLink {
  rel: string;
  href: string;
  // Add other properties as needed
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies();

  const [totalAmount, setTotalAmount] = useState(
    location.state.price.toFixed(2)
  );
  const [cartItems] = useState({
    quantity: location.state.quantity,
    price: totalAmount,
  });

  const disptach = useDispatch();
  const { appContainerActions } = useAppContainerSlice();

  const appContainerStates = useSelector(selectAppContainerState);

  const { cart, address } = appContainerStates;

  const calculateDeliveryDate = () => {
    const today = new Date();
    var deliveryDate;
    if (location.state.delivery == 'standard') {
      deliveryDate = new Date(today.setDate(today.getDate() + 5));
    } else if (location.state.delivery == 'express') {
      deliveryDate = new Date(today.setDate(today.getDate() + 3));
    } else {
      deliveryDate = new Date(today.setDate(today.getDate() + 1));
    }
    return deliveryDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  useEffect(() => {
    disptach(appContainerActions.getAddress(cookies.user_id));
    console.log('location state', location.state);
    console.log('---->', address);
  }, []);

  useEffect(() => {
    setFormData({
      firstName: cookies.username,
      email: cookies.email,
      address: `${address[0]?.street},
      ${address[0]?.city},
      ${address[0]?.state},
      ${address[0]?.country},
      ${address[0]?.postalCode}
    `,
      deliveryDate: calculateDeliveryDate(),
    });
  }, [address]);

  const [formData, setFormData] = useState<FormValues>(() => ({
    firstName: cookies.username,
    email: cookies.email,
    address: `${address[0]?.street},
      ${address[0]?.city},
      ${address[0]?.state},
      ${address[0]?.country},
      ${address[0]?.postalCode}
    `,
    deliveryDate: calculateDeliveryDate(),
  }));

  const handleInputChange = <T extends keyof FormValues>(
    name: T,
    value: FormValues[T]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const options = {
    clientId:
      'AcfPEz69Itpd35FRcq0KdcZzxDUVX_m3REkCgoIwoG9JojUOymHtMl-Og8wHlWPTK1JxWhWqKSgIhcER',
  };

  const handleCheckout = async () => {
    // Your existing checkout logic, e.g., sending data to a server

    // Set up the order details
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'CAD', // Specify the currency code here
            value: totalAmount.toString(), // Convert to string
          },
        },
      ],
    };

    try {
      // Obtain the access token from the PayPal OAuth token endpoint
      const tokenResponse = await fetch(
        'https://api.sandbox.paypal.com/v1/oauth2/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              btoa(
                'AcfPEz69Itpd35FRcq0KdcZzxDUVX_m3REkCgoIwoG9JojUOymHtMl-Og8wHlWPTK1JxWhWqKSgIhcER:8mrZ#J#8'
              ), // Replace with your actual client ID and secret
          },
          body: 'grant_type=client_credentials',
        }
      );

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Call the PayPal REST API to create an order
      const response = await fetch(
        'https://api.sandbox.paypal.com/v2/checkout/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(order),
        }
      );
      console.log(order);
      console.log('Order Creation Response:', response);

      // Parse the response
      const result = await response.json();

      // Check if the 'links' property exists in the result
      if (result.links && Array.isArray(result.links)) {
        // Find the link with rel === 'approve'
        const approveLink = result.links.find(
          (link: PayPalLink) => link.rel === 'approve'
        );

        // Check if the approveLink is defined
        if (approveLink) {
          // Redirect to PayPal for payment
          window.location.href = approveLink.href;
        } else {
          console.error(
            'Error creating order: No "approve" link found in the response'
          );
          // Handle the error as needed
        }
      } else {
        console.error(
          'Error creating order: Invalid response structure'
        );
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle the error as needed
    }
  };

  const onApprove = async (data: any, actions: any) => {
    // Capture the funds from the transaction
    await actions.order.capture();

    // Redirect to a confirmation page or handle success as needed
    navigate('/confirmation');
  };

  const onError = (err: any) => {
    // Handle errors as needed
    console.error('Error during checkout:', err);
  };

  return (
    <PayPalScriptProvider options={options}>
      <div className="w-100 p-4">
        <div className="main-container w-100">
          <div className="left-container">
            <h2>Shipping Information</h2>
            <div className="divider"></div>
            <form>
              {/* <div className="form-group">
                <label htmlFor="firstName">Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                />
              </div> */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                />
              </div> */}
              {/* <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange('email', e.target.value)
                  }
                />
              </div> */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange('email', e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-600"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={(e) =>
                    handleInputChange('address', e.target.value)
                  }
                  rows={3}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                ></textarea>
              </div>
              {/* <div className="form-group my-3">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  cols={15}
                  rows={6}
                  onChange={(e) =>
                    handleInputChange('address', e.target.value)
                  }
                ></textarea>
              </div> */}
              <div className="form-group">
                <h3>
                  Estimated Delivery Date: {formData.deliveryDate}
                </h3>
              </div>
            </form>
          </div>
          <div className="right-container">
            <h2>Order Summary</h2>
            <div className="divider"></div>
            <div className="order-summary">
              <h3>
                <OrderSummary cartItems={cartItems} />
              </h3>
            </div>
            <p>Proceed to pay</p>
            <PayPalButtons
              style={{ layout: 'horizontal' }}
              onClick={handleCheckout}
              onApprove={onApprove}
              onError={onError}
            />
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
