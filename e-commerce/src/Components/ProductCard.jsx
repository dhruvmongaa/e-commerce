import React from 'react'
import { FaStar } from 'react-icons/fa'
import { addToCart } from '../Redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { openLoginModal, setPendingProduct } from '../Redux/modalSlice'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    e.preventDefault()

    if (!isLoggedIn) {
      dispatch(setPendingProduct(product))       
      dispatch(openLoginModal())                 
      return
    }

    dispatch(addToCart(product))
    alert('Your Product Added Successfully')
  }

  return (
    <Link to={`/product/${product.id}`}>
    <div className='bg-white p-4 shadow relative border transform transition-transform 
    duration-300 hover:scale-105'>
      <img src={product.image} alt={product.name} className='w-full h-48 object-contain mb-4' />
      <h3 className='text-lg font-semibold'>{product.name}</h3>
      <p className='text-gray-500'>${product.price}</p>
      <div className='flex items-center mt-2'>
        {[...Array(4)].map((_, i) => (
          <FaStar key={i} className='text-yellow-500' />
        ))}
      </div>
      <div className='absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600
       group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all duration-100'
        onClick={(e) => handleAddToCart(e, product)}>
        <span className='group-hover:hidden'>+</span>
        <span className='hidden group-hover:block'>Add to cart</span>
      </div>
    </div>
    </Link>
  )
}

export default ProductCard
