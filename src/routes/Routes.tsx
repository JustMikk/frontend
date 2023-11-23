import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import AdminHome from "../admin/pages/Home";
import Users from "../admin/pages/Users";
import Events from "../admin/pages/Events";
import NewUsers from "../admin/pages/NewUsers";
import Anouncement from "../admin/pages/Anouncement";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<NewUsers />} />
        <Route path="/admin/members" element={<Users />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/announcements" element={<Anouncement />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
