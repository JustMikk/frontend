import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AdminNavbar from "../common/AdminNavbar";
import Sidebar from "../common/Sidebar";
import UsersTable from "../components/UsersTable";
import React from "react";
import CreateUser from "../components/CreateUser";

const Users = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <div className="flex justify-start">
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
            Add new user
          </Button>
        </div>
        <CreateUser onClose={onClose} isOpen={isOpen} cancelRef={cancelRef} />
        <div className="flex flex-col mx-2 md:mx-6 mt-5 border rounded-xl py-3 ">
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default Users;
