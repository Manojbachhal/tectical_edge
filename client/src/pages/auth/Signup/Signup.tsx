import React, { useState } from "react";
import type { errorInterface } from "../Login/LoginInterface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const SignupForm = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<errorInterface>({ email: "", password: "" });
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: errorInterface = { email: "", password: "" };

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
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/register`, values);

        if (response?.data?.message === "Email already registered") {
          throw new Error("Email already registered");
        }

        toast.success("Signup successful! Redirecting...");
        navigate("/login");
      } catch (error: any) {
        toast.error(error?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="loginpage flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] min-w-[350px] mx-auto text-center p-5 flex flex-col gap-4"
      >
        <h2 className="text-[57px] text-white">Sign up</h2>
        <div className="flex flex-col gap-4">
          <div>
            <input
              className="bg-[#224957] px-2 text-white rounded text-[14px] w-full p-2"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="bg-[#224957] px-2 text-white rounded text-[14px] w-full p-2"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
        </div>
        <button type="submit" className="bg-[#2BD17E] w-full p-2 rounded text-white mt-4">
          Sign up
        </button>
        <span
          className="text-white text-[12px] cursor-pointer underline"
          onClick={() => navigate("/login")}
        >
          Already a user? Login here
        </span>
      </form>
    </div>
  );
};

export default SignupForm;
