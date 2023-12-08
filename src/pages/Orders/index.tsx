import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice';
import { selectAppContainerState } from '../AppContainer/slice/selector';
import { useCookies } from 'react-cookie';
import OrderItems from './OrderItems';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Orders = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { appContainerActions } = useAppContainerSlice();
  const appContainerStates = useSelector(selectAppContainerState);
  const { cart, orders, address, productList } = appContainerStates;

  useEffect(() => {
    dispatch(appContainerActions.getAddress(cookies.user_id));
    dispatch(appContainerActions.getOrders(cookies.user_id));
    calcultePrice();
  }, []);

  useEffect(() => {
    calcultePrice();
  }, [orders, productList]);

  const orderDate = new Date(orders[0]?.createdAt);

  function calcultePrice() {
    let totalPrice: number = 0;
    let qty = 0;
    orders[0]?.orders.forEach((cartItem: any) => {
      // Find the corresponding product based on productId
      const product = productList.find(
        (p) => p.id === cartItem.productId
      );
      if (product) {
        totalPrice += cartItem.quantity * product.variants[0].price;
        qty += cartItem.quantity;
      }
    });
    setTotal(totalPrice);
  }

  return (
    <div className="bg-white p-8 w-[75%]">
      <div className="flex justify-between items-center mb-6 w-[75]">
        <div>
          <h1 className="text-2xl font-semibold">
            Order ID: {orders[0]?.id.substring(0, 7)}
          </h1>
          <p className="text-gray-600">
            Order date:{' '}
            {new Date(orders[0]?.createdAt).toDateString()}
          </p>
          <p className="text-green-600">
            Estimated delivery:
            {new Date(
              orderDate.setDate(orderDate.getDate() + 3)
            ).toDateString()}
          </p>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => {
              html2canvas(document.body).then((canvas) => {
                // Initialize jsPDF
                const doc = new jsPDF('p', 'mm', 'a4');
                const imgData = canvas.toDataURL('image/png');

                // Add image Canvas to PDF
                const imgProps = doc.getImageProperties(imgData);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight =
                  (imgProps.height * pdfWidth) / imgProps.width;
                doc.addImage(
                  imgData,
                  'PNG',
                  0,
                  0,
                  pdfWidth,
                  pdfHeight
                );

                // Save the PDF
                doc.save('invoice.pdf');
              });
            }}
          >
            Invoice
          </button>
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Track order
          </button> */}
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4 mb-6">
        {/* Repeat this div for each product */}
        {orders.length !== 0 &&
          orders[0].orders.map((o: any) => (
            <OrderItems
              productId={o.productId}
              quantity={o.quantity}
            />
          ))}
        {/* End of product div */}
      </div>

      {/* Payment and Delivery Information */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Delivery:</h3>
          <p className="font-light">Address:</p>
          <p>{address[0]?.street}</p>
          <p>
            {address[0]?.city}, {address[0]?.country}
          </p>
          <p>{address[0]?.postalCode}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>
          {/* <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${'subtotal.toFixed(2)'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount (20%)</span>
            <span>-${'discount.toFixed(2)'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>${'delivery.toFixed(2)'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>+${'tax.toFixed(2)'}</span>
          </div> */}
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span className="font-light">SubTotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="font-light">Delivery:</span>
              <span>{orders[0]?.deliveryType}</span>
            </div>
            {orders[0]?.promoCode !== '' && (
              <div className="flex justify-between font-semibold">
                <span className="font-light">Promo:</span>
                <span className="font-light">
                  {orders[0]?.promoCode.toUpperCase()}
                </span>
              </div>
            )}
            <hr />
            <div className="flex justify-between font-semibold mt-2">
              <span className="font-light">Total:</span>
              <span>${orders[0]?.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
