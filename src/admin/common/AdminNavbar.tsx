import { Avatar } from "@chakra-ui/react";

const AdminNavbar = () => {
  const first_name = localStorage.getItem("first_name") || "";
  return (
    <nav className="w-full h-20 px-10 py-2 flex items-center justify-end shadow-2xl">
      <Avatar name={first_name} src="" />
    </nav>
  );
};

export default AdminNavbar;
