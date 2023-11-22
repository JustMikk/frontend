import { Link, useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { AiFillDashboard } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import { RiUserUnfollowFill } from "react-icons/ri";

const links = [
  {
    label: "Dashboard",
    icon: <AiFillDashboard size="28" className="text-center" />,
    href: "/admin",
  },
  {
    label: "Members",
    icon: <FaUsers size="28" className="text-center" />,
    href: "/admin/members",
  },
  {
    label: "New Users",
    icon: <RiUserUnfollowFill size="28" className="text-center" />,
    href: "/admin/users",
  },
  {
    label: "Events",
    icon: <GiTrophyCup size={28} className="text-center" />,
    href: "/admin/events",
  },
  {
    label: "Announcements",
    icon: <HiSpeakerphone size={28} className="text-center" />,
    href: "/admin/announcements",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname.toString();

  return (
    <aside className=" h-[110vh] shadow-2xl py-3">
      <div className="flex items-center justify-center w-full">
        <Link
          to="/"
          className="hidden md:flex text-xl pt-4 font-bold text-center"
        >
          CSEC ASTU
        </Link>
      </div>
      <div className="flex flex-col w-full mt-[6vh] md:mt-[4vh]">
        <ul className="w-full">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`mx-3 flex items-center justify-start gap-4 text-neutral-500 ${
                currentPath === link.href && "bg-purple-500 text-white"
              } py-2 rounded-lg px-4 `}
            >
              {link.icon}
              <span className="hidden md:flex font-semibold text-lg text-center">
                {link.label}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
