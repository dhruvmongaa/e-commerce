import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice";
import { addToCart } from "../Redux/cartSlice";
import { closeModal, clearPendingProduct } from "../Redux/modalSlice";
import { useState } from "react";


const Login = ({ openSignup }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
  const newErrors = {};
  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format.";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required.";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const dispatch = useDispatch();
  const pendingProduct = useSelector((state) => state.modal.pendingProduct);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) return;
    dispatch(login({ email }));

    if (pendingProduct) {
      dispatch(addToCart(pendingProduct));
      dispatch(clearPendingProduct());
      alert("Product added to cart");
    }

    dispatch(closeModal());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            className="w-full px-3 py-2 border"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />{" "}
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            className="w-full px-3 py-2 border"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-gray-700">Remember Me</span>
          </label>
          <a href="#" className="text-red-800">
            Forgot Password
          </a>
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full bg-red-600 text-white py-2">
            Login
          </button>
        </div>
      </form>
      <div className="text-center">
        <span className="text-gray-700">Don't Have an Account?</span>
        <button className="text-red-800 ml-1" onClick={openSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
