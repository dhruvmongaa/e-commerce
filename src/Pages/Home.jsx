import React, { useEffect } from "react";
import { Categories, mockData } from "../assets/mockData";
import HeroImage from "../assets/Hero.jpg";
import InfoSection from "../Components/InfoSection";
import CategorySection from "../Components/CategorySection";
import { setProducts } from "../Redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(setProducts(mockData));
  }, []);
  const navigate = useNavigate();

  return (
    <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
      <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-2">
        <div className="w-full md:w-3/12">
          <div className="bg-red-600 text-white text-xs font-bold px-2 py-2.5">
            <div>SHOP BY CATEGORIES</div>
          </div>
          <ul className="space-x-4 bg-gray-100 p-3 border">
            {Categories.map((category, index) => (
              <li
                key={index}
                className="flex items-center text-md  font-medium"
              >
                <div className="w-2 h-2 border border-red-500 rounded-full mr-2"></div>
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-9/12 mt-8 md:mt-0 h-96 relative">
          <img src={HeroImage} alt="" className="h-full w-full" />
          <div className="absolute top-10 left-4 sm:top-16 max-w-[90%] sm:max-w-[60%]">
            <h2 className="text-md sm:text-3xl font-bold">WELCOME TO StyleMania❤️</h2>
            <p className="text-md sm:text-xl mt-2 font-bold text-gray-800">
              MILLIONS+ PRODUCTS
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-red-600 px-8 py-1.5 text-white mt-4 hover:bg-red-700
                transform transition-transform duration-300 hover:scale-105 "
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <InfoSection />
      <CategorySection />

      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Top Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
          {products.products
            .filter((product) => {
              const category = product.category?.toLowerCase();
              return (
                category !== "men" && category !== "women" && category !== "kid"
              );
            })
            .slice(0, 10)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
