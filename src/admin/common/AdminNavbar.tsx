// AdminNavbar.tsx
import {
  Avatar,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import LogOut from "../../actions/LogOut";

const AdminNavbar: React.FC = () => {
  const first_name = localStorage.getItem("first_name") || "";
  const last_name = localStorage.getItem("last_name") || "";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await LogOut();
      // Navigate after successful logout
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="w-full h-20 px-10 py-2 bg-white flex items-center justify-end shadow-2xl">
      <Popover>
        <PopoverTrigger>
          <Avatar name={`${first_name} ${last_name}`} src="" />
        </PopoverTrigger>
        <Portal>
          <div className="w-4">
            <PopoverContent w="44" className="relative right-5">
              <PopoverBody className="w-full flex flex-col gap-3 items-center justify-center">
                {first_name === "" ? (
                  <>
                    <Link
                      className="text-center hover:bg-neutral-200 w-full py-2 rounded-lg"
                      to="/signin"
                    >
                      Sign In
                    </Link>
                    <Link
                      className="text-center hover:bg-neutral-200 w-full py-2 rounded-lg"
                      to="/register"
                    >
                      Register
                    </Link>{" "}
                  </>
                ) : (
                  <>
                    <div
                      onClick={handleLogout}
                      className="text-center hover:bg-neutral-200 w-full py-2 rounded-lg cursor-pointer"
                    >
                      Log out
                    </div>
                  </>
                )}
              </PopoverBody>
            </PopoverContent>
          </div>
        </Portal>
      </Popover>
    </nav>
  );
};

export default AdminNavbar;
