import React, { useState,useMemo,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import {login,clearLogin} from "../redux/slices/authSlice"
function LoginPage() {
  const { loading, error, success, message } = useSelector( (state) => state.auth.login);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  useMemo(() => {
    document.title = "Login | Pizza Fleet";
    return () => {
      document.title = "Pizza Fleet";
    };
  }, []);
  useEffect(() => {
    if (success) {
      dispatch(clearLogin());
    }
    return () => {
      dispatch(clearLogin());
    };
  }, [dispatch, success]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Email:', email);
      console.log('Password:', password);
      dispatch(login({ email, password })).then(() => {
          Navigate('/home');
      });
      
    } 
  };
  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };
  const handleGoogleLogin = () => {
    console.log('Google Authentication');
  };
  return (
    <>
    
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="max-w-md p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
          login
          </button>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>
      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
      >
        Login with Google
      </button>
    </div>
    </>
    
  );
}

export default LoginPage;
