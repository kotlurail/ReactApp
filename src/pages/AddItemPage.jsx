import React, { useState,useEffect,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearItem,fetchAllItems } from '../redux/slices/itemSlice';
import { Link ,useNavigate} from 'react-router-dom';
// import { addItem } from '../redux/slices/itemSlice';

function AddItemPage() {
  const dispatch = useDispatch();
  const Navigate=useNavigate()
  const { loading, error, success, message } = useSelector((state) => state.item.addItemObj);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [errors, setErrors] = useState({});
  useMemo(() => {
    document.title = "addItem | Pizza Fleet";
    return () => {
      document.title = "Pizza Fleet";
    };
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'imageUrl') {
      setImageUrl(value);
    }
  };

  const validateField = (fieldName) => {
    const value =
      fieldName === 'title' ? title : fieldName === 'price' ? price : imageUrl;

    const newErrors = {};

    if (fieldName === 'title' && (!value.trim() || value.trim().length <= 3)) {
      newErrors.title = 'Title must be more than 3 characters';
    }

    if (fieldName === 'price' && (!value.trim() || isNaN(value))) {
      newErrors.price = 'Invalid price';
    }

    if (fieldName === 'imageUrl' && false) {
      newErrors.imageUrl = 'Invalid image URL';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));
  };

  const handleBlur = (fieldName) => {
    validateField(fieldName);
  };
const redirectToLoginPage=()=>{
  dispatch(clearItem());
  Navigate('/home');
}
  const handleSubmit = (e) => {
    e.preventDefault();

    validateField('title');
    validateField('price');
    validateField('imageUrl');

    if (Object.keys(errors).length === 0) {
      console.log({ title, price, imageUrl },"{ title, price, imageUrl } at 64")
      // Assuming you have a Redux action to add an item
      dispatch(addItem({ name:title, price, imageUrl })).then(() => {
        console.log("successfully created");
        // Additional logic after successful item addition (e.g., redirect)
      });
    } else {
      console.log('Form validation failed.');
    }
  };

  // const isValidUrl = (url) => {
  //   // Basic URL validation
  //   const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  //   return pattern.test(url);
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="max-w-md p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
            onBlur={() => handleBlur('title')}
            className={`w-full p-2 border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            placeholder="Enter item title"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={handleInputChange}
            onBlur={() => handleBlur('price')}
            className={`w-full p-2 border ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            placeholder="Enter item price"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={handleInputChange}
            onBlur={() => handleBlur('imageUrl')}
            className={`w-full p-2 border ${
              errors.imageUrl ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            placeholder="Enter item image URL"
          />
          {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {success ? 'Success' : 'Add Item'}
          
        </button>
         <button onClick={redirectToLoginPage}  className="bg-red-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Home Page</button>
      </form>
    </div>
  );
}

export default AddItemPage;
