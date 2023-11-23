// tokenUtils.js

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8000/auth";

const setTokens = (loginResponse: any) => {
  localStorage.setItem("access", loginResponse.data.access);
  localStorage.setItem("refresh", loginResponse.data.refresh);
};

const getUserData = () => {
  const header = {
    Authorization: `JWT ${localStorage.getItem("access")}`,
  };

  return axios.get(`${API_URL}/users/me/`, { headers: header })
    .then((userResponse) => {
      // Update user info in local storage
      localStorage.setItem("first_name", userResponse.data.first_name);
      localStorage.setItem("last_name", userResponse.data.last_name);
      localStorage.setItem("email", userResponse.data.email);
    });
};

const checkTokenExpiration = () => {
  const token = localStorage.getItem("access");

  if (token) {
    const decodedToken = jwtDecode(token);

    if (!decodedToken || !decodedToken.exp) {
      return;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    const navigate = useNavigate();

    if (decodedToken.exp < currentTime) {
      navigate("/");
    }
  }
};

export { setTokens, getUserData, checkTokenExpiration };
