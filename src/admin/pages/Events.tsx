import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import AdminNavbar from "../common/AdminNavbar";
import Sidebar from "../common/Sidebar";
import SIngleEvent from "../components/SIngleEvent";
import React from "react";

const Events = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <div className="flex justify-start bg-neutral-100">
      <Sidebar />
      <div className="flex flex-col w-full">
        <AdminNavbar />
        <div className="flex mt-10 justify-end px-6">
          <Button
            onClick={onOpen}
            colorScheme="messenger"
            className="flex items-center justify-around gap-2"
          >
            <AddIcon />
            Add new Event
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full p-4 md:p-6">
          <SIngleEvent />
          <SIngleEvent />
          <SIngleEvent />
          <SIngleEvent />
          <SIngleEvent />
          <SIngleEvent />
        </div>
      </div>
    </div>
  );
};

export default Events;
