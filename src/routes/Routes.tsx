import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import AdminHome from "../admin/pages/Home";
import Users from "../admin/pages/Users";
import Events from "../admin/pages/Events";
import NewUsers from "../admin/pages/NewUsers";
import AdminAnouncement from "../admin/pages/Anouncement";
import Announcements from "../pages/Anouncements";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<NewUsers />} />
        <Route path="/admin/members" element={<Users />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/announcements" element={<AdminAnouncement />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
