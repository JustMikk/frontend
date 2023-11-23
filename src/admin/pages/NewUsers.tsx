import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AdminNavbar from "../common/AdminNavbar";
import Sidebar from "../common/Sidebar";
import UsersTable from "../components/UsersTable";
import React, { useEffect, useState } from "react";
import CreateUser from "../components/CreateUser";
import axios from "axios";

interface Event {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  passed: boolean;
  in_dev: boolean;
  in_cpd: boolean;
  in_cbd: boolean;
}

const NewUsers = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users-not-passed/",
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
        }
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreateEventSuccess = () => {
    fetchEvents(); // Fetch events after a new event is successfully created
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="flex justify-start h-[100%]">
      <Sidebar />
      <div className="flex flex-col w-full h-full ml-24 md:ml-60 ">
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
        <CreateUser
          onClose={onClose}
          isOpen={isOpen}
          cancelRef={cancelRef}
          onSuccess={handleCreateEventSuccess}
        />
        <div className="flex flex-col mx-2 md:mx-6 mt-5 border rounded-xl py-3 h-full ">
          <UsersTable
            onSuccess={handleCreateEventSuccess}
            users={events}
            API_URL="http://localhost:8000/api/users-not-passed/"
          />
        </div>
      </div>
    </div>
  );
};

export default NewUsers;

// users-not-passed
