import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { errorInterface } from "./LoginInterface";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const LoginForm = () => {
  const [values, setValues] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: errorInterface = {
      email: "",
      password: "",
    };

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    //  Show validation errors via toast
    if (validationErrors.email) toast.error(validationErrors.email);
    if (validationErrors.password) toast.error(validationErrors.password);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        const response: any = await axios.post(`${BASE_URL}/auth/login`, values);
        if (response.data?.message === "Invalid credentials") {
          throw new Error("Invalid credentials");
        }
        localStorage.setItem("token", response.data.data.access_token);
        toast.success("Login successful!");
        navigate("/");
      } catch (error: any) {
        const message = error?.message || "Login failed";
        toast.error(message);
      }
    }
  };

  return (
    <div className="loginpage flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] min-w-[350px] mx-auto text-center p-5 flex flex-col gap-4"
      >
        <h2 className="text-[57px] text-white">Sign in</h2>
        <div className="flex flex-col gap-4">
          <input
            className="bg-[#224957] px-2 text-white rounded text-[14px] w-full p-2"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="bg-[#224957] px-2 text-white rounded text-[14px] w-full p-2"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          <div>
            <input type="checkbox" /> <span className="text-white font-[14px]"> Remember me</span>
          </div>
        </div>
        <button type="submit" className="bg-[#2BD17E] w-full p-2 rounded text-white mt-4">
          Login
        </button>
        <span
          className="text-white text-[12px] cursor-pointer underline"
          onClick={() => navigate("/signup")}
        >
          Not a user signup here
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
