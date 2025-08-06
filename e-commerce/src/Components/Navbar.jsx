import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import Login from "./Login";
import Register from "./Register";
import {
  openLoginModal,
  openRegisterModal,
  closeModal,
} from "../Redux/modalSlice";
import { setSearchTerm } from "../Redux/productSlice";
import { logout } from "../Redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.cart.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isModelOpen = useSelector((state) => state.modal.isModalOpen);
  const isLogin = useSelector((state) => state.modal.showLogin);

  const [search, setSearch] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
    navigate("/filter-data");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-8 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">StyleMania❤️</Link>
        </div>
        <div className="relative flex-1 mx-4">
          <form
            onSubmit={handleSearch}
            // className="relative w-full max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-16 py-2 border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
            >
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-lg" />
            {products.length > 0 && (
              <span className="absolute top-0 text-xs w-3 left-3 bg-red-600 rounded-full flex justify-center items-center text-white">
                {products.length}
              </span>
            )}
          </Link>

          {/* 👇 Conditionally show Login or Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:block text-red-600 font-medium"
            >
              Logout
            </button>
          ) : (
            <button
              className="hidden md:block"
              onClick={() => dispatch(openLoginModal())}
            >
              Login | Register
            </button>
          )}

          <button
            className="block md:hidden"
            onClick={() => {
              isLoggedIn ? handleLogout() : dispatch(openLoginModal());
            }}
          >
            <FaUser />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-10 py-4 text-md font-bold">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/shop" className="hover:underline">
          Shop
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
      </div>

      {/* MODAL */}
      <Modal
        isModelOpen={isModelOpen}
        setIsModelOpen={() => dispatch(closeModal())}
      >
        {isLogin ? (
          <Login openSignup={() => dispatch(openRegisterModal())} />
        ) : (
          <Register openLogin={() => dispatch(openLoginModal())} />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
