import React, { lazy, Suspense, useState } from "react";
import "./App.css";
import Protected from "./components/Protected";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AddItemPage = lazy(() => import("./pages/AddItemPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const Login = lazy(() => import("./pages/LoginPage"));
const Home = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AddedItemsPage = lazy(() => import("./pages/AddedItemsPage"));
const DebouncedSearchComponent = lazy(() =>
  import("./pages/DebouncedSearchComponent")
);

function App() {
  const dispatch = useDispatch();
  return (
    <Router>
      <Suspense fallback={<div>Loading1devdev2dev3 .......</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected>
                <Home />{" "}
              </Protected>
            }
          />
          <Route
            path="/additem"
            element={
              <Protected>
                <AddItemPage />
              </Protected>
            }
          />
          <Route
            path="/cartitems"
            element={
              <Protected>
                <AddedItemsPage />
              </Protected>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/searchitem"
            element={
              <Protected>
                <DebouncedSearchComponent />
              </Protected>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
