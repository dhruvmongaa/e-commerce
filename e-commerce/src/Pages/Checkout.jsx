import React, { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = ({ setOrder }) => {
  const [billingToggle, setBillingToggle] = useState(true);
  const [shippingToggle, setShippingToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    zip: ""
  });

  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleOrder = () => {
    const newErrors = {};

    // Billing validations
    if (!billingInfo.name) newErrors.name = "Name is required";
    if (!billingInfo.email) newErrors.email = "Email is required";
    if (!billingInfo.phone) newErrors.phone = "Phone is required";

    // Shipping validations
    if (!shippingInfo.address) newErrors.address = "Address is required";
    if (!shippingInfo.city) newErrors.city = "City is required";
    if (!shippingInfo.zip) newErrors.zip = "Zip code is required";

    // Card validations
    if (paymentMethod === "dc") {
      if (!cardInfo.number) newErrors.cardNumber = "Card number is required";
      if (!cardInfo.name) newErrors.cardName = "Card holder name is required";
      if (!cardInfo.expiry) newErrors.expiry = "Expiry date is required";
      if (!cardInfo.cvv) newErrors.cvv = "CVV is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const newOrder = {
      products: cart.products,
      orderNumber: "12344",
      billingInformation: billingInfo,
      shippingInformation: shippingInfo,
      totalPrice: cart.totalPrice,
      paymentMethod
    };

    setOrder(newOrder);
    navigate("/order-confirmation");
  };

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      <h3 className="text-2xl font-semibold mb-4">CHECKOUT</h3>
      <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
        <div className="md:w-2/3">

          {/* Billing Info */}
          <div className="border p-2 mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setBillingToggle(!billingToggle)}
            >
              <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
              {billingToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`space-y-4 ${billingToggle ? "" : "hidden"}`}>
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border"
                  value={billingInfo.name}
                  onChange={(e) =>
                    setBillingInfo({ ...billingInfo, name: e.target.value })
                  }
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border"
                  value={billingInfo.email}
                  onChange={(e) =>
                    setBillingInfo({ ...billingInfo, email: e.target.value })
                  }
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border"
                  value={billingInfo.phone}
                  onChange={(e) =>
                    setBillingInfo({ ...billingInfo, phone: e.target.value })
                  }
                />
                {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border p-2 mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShippingToggle(!shippingToggle)}
            >
              <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
              {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border"
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, address: e.target.value })
                  }
                />
                {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border"
                  value={shippingInfo.city}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                />
                {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Zip Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border"
                  value={shippingInfo.zip}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, zip: e.target.value })
                  }
                />
                {errors.zip && <p className="text-red-600 text-sm">{errors.zip}</p>}
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border p-2 mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setPaymentToggle(!paymentToggle)}
            >
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label className="block text-gray-700 ml-2">Cash on Delivery</label>
              </div>

              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "dc"}
                  onChange={() => setPaymentMethod("dc")}
                />
                <label className="block text-gray-700 ml-2">Debit Card</label>
              </div>

              {paymentMethod === "dc" && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-4">Debit Card Information</h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="Enter card number"
                      className="border p-2 w-full rounded"
                      value={cardInfo.number}
                      onChange={(e) =>
                        setCardInfo({ ...cardInfo, number: e.target.value })
                      }
                    />
                    {errors.cardNumber && (
                      <p className="text-red-600 text-sm">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Card Holder Name</label>
                    <input
                      type="text"
                      placeholder="Enter card holder name"
                      className="border p-2 w-full rounded"
                      value={cardInfo.name}
                      onChange={(e) =>
                        setCardInfo({ ...cardInfo, name: e.target.value })
                      }
                    />
                    {errors.cardName && (
                      <p className="text-red-600 text-sm">{errors.cardName}</p>
                    )}
                  </div>

                  <div className="flex justify-between mb-4">
                    <div className="w-1/2 mr-2">
                      <label className="block text-gray-700 font-semibold mb-2">Expire Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="border p-2 w-full rounded"
                        value={cardInfo.expiry}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, expiry: e.target.value })
                        }
                      />
                      {errors.expiry && (
                        <p className="text-red-600 text-sm">{errors.expiry}</p>
                      )}
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="CVV"
                        className="border p-2 w-full rounded"
                        value={cardInfo.cvv}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, cvv: e.target.value })
                        }
                      />
                      {errors.cvv && (
                        <p className="text-red-600 text-sm">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.products.map((product) => (
              <div key={product.id} className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="ml-4">
                    <h4 className="text-md font-semibold">{product.name}</h4>
                    <p className="text-gray-600">
                      ${product.price} X {product.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span>Total Price:</span>
              <span className="font-semibold">${cart.totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800"
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;