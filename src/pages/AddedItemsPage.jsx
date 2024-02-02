// HomePage.js
import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  clearLogin,
  clearRegister,
  clearLogout,
  fetchuserDetails,
} from "../redux/slices/authSlice";
import {
  fetchCartItems,
  clearFetchItemOfCart,
  addItemToCart,
} from "../redux/slices/cartSlice";
import phonesData from "../data.json"; // Import your JSON file
const PhoneList = lazy(() => import("../components/PhoneList"));

// ... (imports)

const AddedItemsPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  // const [items,setItems]=useState([]);
  const { loading, error, success, message } = useSelector(
    (state) => state.auth.logout
  );
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const {
    loading: fetchCartLoading,
    error: fetchCartError,
    success: fetchCartStatus,
    message: fetchCartItemsAll,
  } = useSelector((state) => state.cart.fetchCartItemsStatus);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  console.log(fetchCartItemsAll, "fetchItemsAll at 23");
  useEffect(() => {
    dispatch(fetchuserDetails());
    dispatch(fetchCartItems());
  }, [dispatch]);

  // If you have the user details available in the Redux state, you can directly access them
  useMemo(() => {
    document.title = "Items Added | Pizza Fleet";
    return () => {
      document.title = "Pizza Fleet";
    };
  }, []);

  useEffect(() => {
    // Update local state when Redux state changes
    setUserEmail(email);
    setUserName(name);
  }, [email, name, fetchCartItems]);

  useEffect(() => {
    return () => {
      // Cleanup function
      dispatch(clearLogout());
      dispatch(clearFetchItemOfCart());
    };
  }, [dispatch]);

  const addItemToServer = () => {
    Navigate("/additem");
  };
  const RedirectToHomePage = () => {
    Navigate("/home");
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">Phone Catalog</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 mr-2"
        >
          Logout
        </button>
        <button
          onClick={addItemToServer}
          className="bg-pink-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 mr-2"
        >
          Add Item
        </button>
        <button
          onClick={RedirectToHomePage}
          className="bg-green-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 mr-2"
        >
          Home Page
        </button>
        {name && (
          <div>
            <p>Welcome, {userName}!</p>
            <p>Email: {userEmail}</p>
          </div>
        )}
        <Suspense fallback={<div>Loading123...</div>}>
          <PhoneList phones={fetchCartItemsAll} />
        </Suspense>
      </div>
    </>
  );
};

export default AddedItemsPage;
