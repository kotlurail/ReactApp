// PhoneCard.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearFetchItemOfCart, addItemToCart } from "../redux/slices/cartSlice";
const PhoneCard = ({ phone }) => {
  const { name: title, price, imageUrl: images } = phone;
  const { success } = useSelector((state) => state.cart.addToCart);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addItemToCart(phone));
  };
  useEffect(() => {
    if (success) {
      dispatch(clearFetchItemOfCart());
    }
  }, [dispatch]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={images} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{price}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 mt-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PhoneCard;
