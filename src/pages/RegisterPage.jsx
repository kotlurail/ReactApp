import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/slices/authSlice";
function RegisterPage() {
  // State for form inputs
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");

  // State for validation
  const [errors, setErrors] = useState({});

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Dynamically update state based on input name
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "state") {
      setRegion(value);
    }
  };

  // Validation function for required fields and specific rules
  const validateField = (fieldName) => {
    const value =
      fieldName === "name"
        ? name
        : fieldName === "email"
        ? email
        : fieldName === "password"
        ? password
        : fieldName === "phone"
        ? phone
        : region;

    const newErrors = {};

    if (fieldName === "name" && (!value.trim() || value.trim().length <= 3)) {
      newErrors.name = "Name must be more than 3 letters";
    }

    if (
      fieldName === "email" &&
      (!value.trim() || !/\S+@\S+\.\S+/.test(value))
    ) {
      newErrors.email = "Invalid email format";
    }

    if (
      fieldName === "password" &&
      (!value.trim() ||
        value.trim().length < 8 ||
        !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])/.test(value))
    ) {
      newErrors.password =
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (fieldName === "phone" && (!value.trim() || !/^\d{10}$/.test(value))) {
      newErrors.phone = "Invalid phone number";
    }

    if (fieldName === "region" && !value.trim()) {
      newErrors.region = "State is required";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));
  };

  // Event handler for onBlur (focus out) to trigger validation
  const handleBlur = (fieldName) => {
    validateField(fieldName);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger validation for all fields before submission
    validateField("name");
    validateField("email");
    validateField("password");
    validateField("phone");
    validateField("region");

    // Check if there are any validation errors
    if (Object.keys(errors).length === 0) {
      // Process the registration logic here (e.g., make an API call)
      console.log("Registration successful!");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Phone:", phone);
      console.log("State:", region);
      dispatch(register({ name, email, password, phone, region })).then(
        () => {}
      );
    } else {
      console.log("Form validation failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="max-w-md p-6 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            onBlur={() => handleBlur("name")}
            className={`w-full p-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            onBlur={() => handleBlur("email")}
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            onBlur={() => handleBlur("password")}
            className={`w-full p-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleInputChange}
            onBlur={() => handleBlur("phone")}
            className={`w-full p-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            region:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={region}
            onChange={handleInputChange}
            onBlur={() => handleBlur("region")}
            className={`w-full p-2 border ${
              errors.region ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Enter your state"
          />
          {errors.region && (
            <p className="text-red-500 text-xs mt-1">{errors.region}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {success ? "Success" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
