import React from "react";
import { useNavigate } from "react-router-dom";

const Order = ({ order }) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
      <h2 className="text-2xl font-semibold mb-4">Thank you for your order</h2>
      <p>
        Your Order has been placed successfully you will recieve an email
        confirmation shortly
      </p>
      <div className="mt-4 p-6 bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <p>Order Number: {order.orderNumber}</p>
        <div className="mt-4">
          <h2 className="text-md font-semibold mb-2">Shipping Information</h2>
          <p>{order.shippingInformation.name}</p>
          <p>{order.shippingInformation.address}</p>
          <p>{order.shippingInformation.city}</p>
          <p>{order.shippingInformation.zip}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Items Ordered</h4>
          {order.products.map((product) => (
            <div key={product.id} className="flex justify-between mt-2">
              <p>
                {product.name} X {product.quantity}
              </p>
              <p>${product.price * product.quantity}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          <span>Total Price:</span>
          <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-start gap-3">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full sm:w-auto">
            Order tracking
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 w-full sm:w-auto"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
