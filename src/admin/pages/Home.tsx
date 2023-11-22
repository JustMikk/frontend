import { Badge } from "@chakra-ui/react";
import AdminNavbar from "../common/AdminNavbar";
import Sidebar from "../common/Sidebar";
import { FaCheckCircle, FaUserPlus, FaUsers } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import Chart from "../components/Chart";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <AdminNavbar />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full p-4 md:p-6">
          <div
            className=" p-4 bg-white w-full rounded-xl shadow-xl cursor-pointer"
            onClick={() => navigate("/admin/members")}
          >
            <FaUsers className="text-purple-700" size="68" />
            <p className=" text-neutral-400 font-medium">Total members</p>
            <div className="flex items-center justify-between">
              <p className=" text-neutral-700 font-bold text-2xl">510</p>
            </div>
          </div>
          <div
            className=" p-4 bg-white w-full rounded-xl shadow-xl cursor-pointer"
            onClick={() => navigate("/admin/users")}
          >
            <FaUserPlus className="text-orange-500" size="68" />
            <p className=" text-neutral-400 font-medium">
              New registerd members
            </p>
            <div className="flex items-center justify-between">
              <p className=" text-neutral-700 font-bold text-2xl">510</p>
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                New
              </Badge>
            </div>
          </div>
          <div
            className=" p-4 bg-white w-full rounded-xl shadow-xl cursor-pointer"
            onClick={() => navigate("/admin/events")}
          >
            <GiTrophyCup className="text-yellow-500" size="68" />
            <p className=" text-neutral-400 font-medium">Event winners</p>
            <div className="flex items-center justify-between">
              <p className=" text-neutral-700 font-bold text-2xl">Yonas</p>
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                New
              </Badge>
            </div>
          </div>
          <div className=" p-4 bg-white w-full rounded-xl shadow-xl">
            <FaCheckCircle
              className="text-green-500 text-center mx-auto"
              size="68"
            />
            <p className=" text-neutral-400 font-medium">Total Solved </p>
            <div className="flex items-center justify-between">
              <p className=" text-neutral-700 font-bold text-2xl">24</p>
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                New
              </Badge>
            </div>
          </div>
        </div>
        <div className="w-full md:px-20">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
