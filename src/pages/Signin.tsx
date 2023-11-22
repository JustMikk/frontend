import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/layout";

const Signin = () => {
  const navigate = useNavigate();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("access");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (!decodedToken || !decodedToken.exp) {
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      const response = await axios.post(
        "http://localhost:8000/auth/jwt/create/",
        formData
      );

      // toast
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      const header = {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      };
      toast.success("Successfully logged in!");
      try {
        const userResponse = await axios.get(
          "http://localhost:8000/auth/users/me/",
          { headers: header }
        );
        // Handle the user response here, for example:
        // console.log(userResponse.data);
        localStorage.setItem("first_name", userResponse.data.first_name);
        localStorage.setItem("last_name", userResponse.data.last_name);
        localStorage.setItem("email", userResponse.data.email);
        navigate("/");
      } catch (error) {}
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="w-full flex items-center justify-center">
        <div className="flex my-[18vh] md:my-[10vh] px-6 py-16 bg-white w-[80vw] md:w-[65vw] lg:w-[50vw] shadow-2xl rounded-3xl">
          <img
            src="/images/signin.jpg"
            className="hidden md:flex w-[40%]"
            alt=""
          />
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={onChange}
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={onChange}
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
              />
              <button
                className="w-80 bg-black text-white rounded-full py-2 font-semibold"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
