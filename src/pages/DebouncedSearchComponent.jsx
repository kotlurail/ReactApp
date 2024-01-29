// DebouncedSearchComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  clearItem,
  fetchAllItems,
  searchAllItems,
} from "../redux/slices/itemSlice";
const DebouncedSearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading, error, success, message } = useSelector(
    (state) => state.item.searchItems
  );

  useEffect(() => {
    let debounceTimer;

    const search = async () => {
      try {
        dispatch(searchAllItems(query));
        console.log(message, "message at 27");
        setResults(message);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("Done Searching");
      }
    };

    // Debounce the search function to only trigger after a certain delay
    const debounceSearch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        search();
      }, 500); // Adjust the delay as needed (e.g., 500 milliseconds)
    };

    if (query.trim() !== "") {
      debounceSearch();
    } else {
      setResults([]); // Clear results when the query is empty
    }

    return () => {
      clearTimeout(debounceTimer); // Clear the timer on component unmount
    };
  }, [query]);
  const redirectToHomePage = () => {
    Navigate("/home");
  };
  return (
    <div>
      <h1>MERN Stack Dynamic Search Example</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={redirectToHomePage}>Home Page</button>

      {loading && <p>Loading...</p>}

      <ul>
        {results.map((result) => (
          <li key={result._id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebouncedSearchComponent;
