import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../assets/Emptycart.jpg";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../Components/Modal";
import ChangeAddress from "../Components/ChangeAddress";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState("Sector 22 , 150002 , Chandigarh");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      {cart.products.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">SHOPPING CART</h3>
          <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
            <div className="mb-6 md:w-2/3">
              <div className="hidden sm:flex justify-between border-b items-center mb-4 text-xs font-bold">
                <p className="text-sm font-bold">PRODUCTS</p>
                <div className="flex space-x-8 text-sm font-bold">
                  <p>PRICE</p>
                  <p>QUANTITY</p>
                  <p>SUBTOTAL</p>
                  <p>REMOVE</p>
                </div>
              </div>

              {cart.products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col lg:pr-12 sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-b"
                >
                  <div className="flex items-center gap-4 sm:w-1/2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <h3 className="text-lg sm:text-base font-semibold break-words max-w-[180px]">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:w-1/2 gap-4 sm:gap-8 text-sm sm:text-base w-full">
                    <div className="flex justify-between sm:block w-full sm:w-auto">
                      <span className="font-medium text-lg sm:hidden">
                        Price:
                      </span>
                      <span>${product.price}</span>
                    </div>
                    <div className="flex justify-between sm:block w-full sm:w-auto">
                      <span className="font-medium text-lg sm:hidden">
                        Quantity:
                      </span>
                      <div className="flex items-center justify-center border">
                        <button
                          className="text-lg font-bold px-2 border-r"
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                        >
                          -
                        </button>
                        <span className="text-lg px-3">{product.quantity}</span>
                        <button
                          className="text-lg px-2 border-l"
                          onClick={() => dispatch(increaseQuantity(product.id))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between sm:block w-full sm:w-auto">
                      <span className="font-medium text-lg sm:hidden">
                        Subtotal:
                      </span>
                      <span>
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between  sm:block w-full sm:w-auto">
                      <span className="font-medium text-lg sm:hidden">
                        Remove:
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => dispatch(removeFromCart(product.id))}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-sm font-semibold mb-5">CART TOTAL</h3>
              <div className="flex justify-between mb-5 border-b pb-1">
                <span className="text-sm">TOTAL ITEMS:</span>
                <span>{cart.totalQuantity}</span>
              </div>
              <div className="mb-4 border-b pb-2">
                <p>Shipping:</p>
                <p className="ml-2">
                  Shipping to{" "}
                  <span className="text-sm font-bold">{address}</span>
                </p>
                <button
                  className="text-blue-500 hover:underline mt-1 ml-2"
                  onClick={() => setIsModelOpen(true)}
                >
                  Change Address
                </button>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total Price:</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-red-600 text-white py-2 hover:bg-red-800"
                onClick={() => navigate("/checkout")}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
          <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
            <ChangeAddress
              setAddress={setAddress}
              setIsModelOpen={setIsModelOpen}
            />
          </Modal>
        </div>
      ) : (
        <div className="flex justify-center">
          <img src={EmptyCart} alt="" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default Cart;
