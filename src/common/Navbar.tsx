import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "Anouncement", href: "/anouncement" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const first_name = localStorage.getItem("first_name") || "";
  // const last_name = localStorage.getItem("last_name") || "";
  return (
    <nav className="w-full px-10 py-2 flex items-center justify-between shadow-2xl">
      <Link to="/" className=" text-xl font-bold">
        CSEC ASTU
      </Link>
      <div className="hidden md:flex space-x-10">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="text-md font-medium text-neutral-500"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Avatar name={first_name} src="" />
    </nav>
  );
};

export default Navbar;
