import AdminNavbar from "../common/AdminNavbar";
import Sidebar from "../common/Sidebar";

const Users = () => {
  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex flex-col w-full">
        <AdminNavbar />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full p-4 md:p-6">
          <div className=" p-4 bg-white w-full h-14 rounded-xl shadow-xl">
            1,1
          </div>
          <div className=" p-4 bg-white w-full h-14 rounded-xl shadow-xl">
            1,2
          </div>
          <div className=" p-4 bg-white w-full h-14 rounded-xl shadow-xl">
            2,1
          </div>
          <div className=" p-4 bg-white w-full h-14 rounded-xl shadow-xl">
            2,2
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
