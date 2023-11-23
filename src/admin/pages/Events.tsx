import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import AdminNavbar from "../common/AdminNavbar";
import Sidebar from "../common/Sidebar";
import SIngleEvent from "../components/SIngleEvent";
import React, { useState, useEffect } from "react";
import CreateEvent from "../components/CreateEvent";
import axios from "axios";

interface Event {
  id: number; // Assuming the id is a number, adjust accordingly
  name: string;
  description: string;
  platform: string;
  start: string; // Assuming start and end are string representations of dates
  end: string;
}

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/events/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });
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
    <div className="flex justify-start  ">
      <Sidebar />
      <div className="flex flex-col w-full ml-24 md:ml-60">
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
        <CreateEvent
          onClose={onClose}
          isOpen={isOpen}
          cancelRef={cancelRef}
          onSuccess={handleCreateEventSuccess}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4 md:p-6">
          {events.map((event) => (
            <SIngleEvent
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

export default AdminEvents;
