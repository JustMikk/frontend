import Layout from "../layout/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SingleEvent from "../components/SingleEvent";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface Event {
  id: number;
  name: string;
  description: string;
  start: string;
  end: string;
  platform: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/events/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      toast.error(
        "Error fetching events. Please check your membership status."
      );
    }
  };

  const handleEventSuccess = () => {
    fetchEvents(); // Fetch events after a new event is successfully created
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Layout>
      <main className="w-full h-full flex flex-col gap-8">
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4 md:p-6">
            {events.length > 0 ? (
              events.map((event) => (
                <SingleEvent
                  key={event.id}
                  onSuccess={handleEventSuccess}
                  event={event}
                />
              ))
            ) : (
              <div className="w-full">
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Not member</AlertTitle>
                  <AlertDescription>You are not lab member</AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Events;
