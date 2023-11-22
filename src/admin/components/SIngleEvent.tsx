import { Badge } from "@chakra-ui/react";
import { GiTrophyCup } from "react-icons/gi";

const SIngleEvent = () => {
  return (
    <div className=" p-4 bg-white w-full rounded-xl shadow-xl">
      <GiTrophyCup className="text-yellow-500" size="68" />
      <p className=" text-neutral-700 font-bold text-2xl">Event Name</p>
      <div className="flex items-center justify-between">
        <p className=" text-neutral-400 font-medium text-xs">
          Start: 12/12/2023
        </p>
        <p className=" text-neutral-400 font-medium text-xs">End: 12/12/2023</p>
      </div>
      <div className="flex items-center justify-between">
        <p className=" text-neutral-700 font-bold text-2xl">Platform</p>
        <Badge ml="1" fontSize="0.8em" colorScheme="green">
          New
        </Badge>
      </div>
    </div>
  );
};

export default SIngleEvent;
