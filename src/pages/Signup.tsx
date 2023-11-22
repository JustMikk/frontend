import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/layout";

const API_URL = "http://localhost:8000/auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("access");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (!decodedToken || !decodedToken.exp) {
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);

      console.log(currentTime);
      console.log(decodedToken.exp);
      if (decodedToken.exp < currentTime) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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
      const registrationResponse = await axios.post(
        `${API_URL}/users/`,
        formData
      );

      // Login
      const loginResponse = await axios.post(`${API_URL}/jwt/create/`, {
        email: formData.email,
        password: formData.password,
      });

      // Set tokens
      localStorage.setItem("access", loginResponse.data.access);
      localStorage.setItem("refresh", loginResponse.data.refresh);

      // Get user data
      const header = {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      };

      const userResponse = await axios.get(`${API_URL}/users/me/`, {
        headers: header,
      });

      // Update user info in local storage
      localStorage.setItem("first_name", userResponse.data.first_name);
      localStorage.setItem("last_name", userResponse.data.last_name);
      localStorage.setItem("email", userResponse.data.email);

      toast.success("Successfully registered and logged in!");
    } catch (error) {
      // Handle errors
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
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
