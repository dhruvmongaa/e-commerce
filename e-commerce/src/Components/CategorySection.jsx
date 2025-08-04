import React from 'react'
import { useNavigate } from 'react-router-dom'
import ManCategory from '../assets/Men.jpg'
import WomenCategory from '../assets/Women.png'
import KidCategory from '../assets/Kids.jpg'

const categories = [
    {
        title: 'men',
        imageUrl: ManCategory,
    },
    {
        title: 'women',
        imageUrl: WomenCategory,
    },
    {
        title: 'kid',
        imageUrl: KidCategory,
    },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (title) => {
    navigate(`/category/${title}`);
  };

  return (
    <div className='container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 cursor-pointer'>
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => handleCategoryClick(category.title)}
          className='relative h-64 transform transition-transform duration-300 hover:scale-105'
        >
          <img
            src={category.imageUrl}
            alt={category.title}
            className='w-full h-full object-cover rounded-lg shadow-md'
          />
          <div className='absolute top-20 left-12'>
            <p className='text-xl font-bold capitalize'>{category.title}</p>
            <p className='text-gray-600'>View All</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
