import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  setTokens,
  getUserData,
  checkTokenExpiration,
} from "../utils/tokenUtils";
import Layout from "../layout/layout";

const API_URL = "http://localhost:8000/auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    // Validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    // Registration
    axios
      .post(`${API_URL}/users/`, formData)
      .then(() => {
        // Login
        return axios.post(`${API_URL}/jwt/create/`, {
          email: formData.email,
          password: formData.password,
        });
      })
      .then((loginResponse) => {
        // Set tokens
        setTokens(loginResponse);

        // Get user data
        return getUserData();
      })
      .then(() => {
        toast.success("Successfully registered and logged in!");
      })
      .catch((error) => {
        // Handle errors
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
          toast.error(`Registration failed: ${error.response.data.detail}`);
        } else if (error.request) {
          console.error(error.request);
          toast.error(
            "Registration failed. No response received from the server."
          );
        } else {
          console.error("Error setting up the request", error.message);
          toast.error("Registration failed. Please try again.");
        }
      });
  };

  return (
    <Layout>
      <div className="w-full flex items-center justify-center">
        <div className="flex my-[18vh] md:my-[10vh] px-6 py-16 bg-white w-[80vw] md:w-[65vw] lg:w-[50vw] shadow-2xl rounded-3xl">
          <img
            src="/images/register.jpg"
            className=" hidden md:flex w-[40%]"
            alt=""
          />
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <form action="" className="flex flex-col gap-4" onSubmit={onSubmit}>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formData.first_name}
                onChange={onChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formData.last_name}
                onChange={onChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formData.email}
                onChange={onChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formData.password}
                onChange={onChange}
              />
              <button
                className="w-80 bg-black text-white rounded-full py-2 font-semibold"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
