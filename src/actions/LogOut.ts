// LogOut.tsx
// import { useNavigate } from "react-router-dom";

const LogOut = async (): Promise<void> => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("first_name");
  localStorage.removeItem("last_name");
  localStorage.removeItem("email");

  // Add any additional logout logic here

  return Promise.resolve();
};

export default LogOut;
