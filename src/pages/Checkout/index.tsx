import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../../components/OrderSummary';
import {
  PayPalScriptProvider,
  PayPalButtons,
} from '@paypal/react-paypal-js';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  deliveryDate: string;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// Define a type for the 'link' object
interface PayPalLink {
  rel: string;
  href: string;
  // Add other properties as needed
}

const Checkout = () => {
  const navigate = useNavigate();

  const calculateDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 4));
    return deliveryDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const [cartItems] = useState<CartItem[]>([
    { id: 1, name: 'Product 1', quantity: 2, price: 100 },
    { id: 2, name: 'Product 2', quantity: 1, price: 200 },
    // Add more items as needed
  ]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const [formData, setFormData] = useState<FormValues>(() => ({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Cityville, USA',
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
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                />
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={(e) =>
                    handleInputChange('address', e.target.value)
                  }
                ></input>
              </div>
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
