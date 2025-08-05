// src/Components/LogoutButton.jsx

import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice"; // path sahi rakhna

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");

    // Optional: redirect after logout
    window.location.href = "/"; // ya navigate('/')
  };

  return (
    <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;