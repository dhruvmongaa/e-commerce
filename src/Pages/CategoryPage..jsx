import { useParams } from "react-router-dom";
import { mockData } from "../assets/mockData";
import ProductCard from "../Components/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const filteredProducts = mockData.filter(
    (product) =>
      product.category?.toLowerCase() === categoryName.toLowerCase()
  );

  const formatTitle = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {formatTitle(categoryName)} Products
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No products found in <strong>{formatTitle(categoryName)}</strong> category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
