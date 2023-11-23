import Layout from "../layout/layout";
import SingleAnouncement from "../components/SingleAnnouncement";
import axios from "axios";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Event[]>([]);

  const fetchannouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/announcements/",
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
        }
      );
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleCreateannouncementsuccess = () => {
    fetchannouncements(); // Fetch announcements after a new event is successfully created
  };

  useEffect(() => {
    fetchannouncements();
  }, []);

  return (
    <Layout>
      <main className="w-full h-full flex flex-col gap-8">
        <div className="flex flex-col w-full ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4 md:p-6">
            {announcements.map((announcement) => (
              <SingleAnouncement
                key={announcement.id}
                onSuccess={handleCreateannouncementsuccess}
                announcement={announcement}
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Announcements;
