import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import AdminNavbar from "../common/AdminNavbar";
import Sidebar from "../common/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleAnouncement from "../components/SingleAnouncement";
import CreateAnnouncement from "../components/CreateAnnouncement";

interface Event {
  id: number; // Assuming the id is a number, adjust accordingly
  name: string;
  description: string;
  date: string;
}

const Anouncement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/announcements/",
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
    <div className="flex justify-start ">
      <Sidebar />
      <div className="flex flex-col w-full ml-24 md:ml-60">
        <AdminNavbar />
        <div className="flex justify-end px-6 mt-10">
          <Button
            onClick={onOpen}
            colorScheme="messenger"
            className="flex items-center justify-around gap-2"
          >
            <AddIcon />
            Add
          </Button>
        </div>
        <CreateAnnouncement
          onClose={onClose}
          isOpen={isOpen}
          cancelRef={cancelRef}
          onSuccess={handleCreateEventSuccess}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4 md:p-6">
          {events.map((event) => (
            <SingleAnouncement
              key={event.id}
              event={event}
              onSuccess={handleCreateEventSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Anouncement;
