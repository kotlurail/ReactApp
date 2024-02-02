// HomePage.js
import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  clearLogout,
  fetchuserDetails,
} from "../redux/slices/authSlice";
import { fetchAllItems, clearFetchItems } from "../redux/slices/itemSlice";
const PhoneList = lazy(() => import("../components/PhoneList"));

// ... (imports)

const HomePage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  // const [items,setItems]=useState([]);
  const { success } = useSelector((state) => state.auth.logout);
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const { message: fetchItemsAll } = useSelector(
    (state) => state.item.fetchItems
  );
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  console.log(fetchItemsAll, "fetchItemsAll at 23");
  useEffect(() => {
    dispatch(fetchuserDetails());
    dispatch(fetchAllItems());
  }, [dispatch]);

  // If you have the user details available in the Redux state, you can directly access them
  useMemo(() => {
    document.title = "Home | Pizza Fleet";
    return () => {
      document.title = "Pizza Fleet";
    };
  }, []);

  useEffect(() => {
    // Update local state when Redux state changes
    setUserEmail(email);
    setUserName(name);
  }, [email, name]);

  useEffect(() => {
    return () => {
      // Cleanup function
      dispatch(clearLogout());
      dispatch(clearFetchItems());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      Navigate("/");
    }
  }, [success, Navigate]);

  const addItemToServer = () => {
    Navigate("/additem");
  };
  const redierctToCart = () => {
    Navigate("/cartitems");
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const searchItem = () => {
    Navigate("/searchitem");
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
          onClick={redierctToCart}
          className="bg-blue-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 mr-2"
        >
          Cart List Items
        </button>
        <button
          onClick={searchItem}
          className="bg-orange-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 mr-2"
        >
          search Item
        </button>
        {name && (
          <div>
            <p>Welcome, {userName}!</p>
            <p>Email: {userEmail}</p>
          </div>
        )}
        <Suspense fallback={<div>Loading124367...</div>}>
          <PhoneList phones={fetchItemsAll} />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
