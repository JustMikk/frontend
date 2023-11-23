import { Badge, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { HiSpeakerphone } from "react-icons/hi";
import AnnouncementDetail from "./AnnouncementDetail";

interface SingleAnouncementProps {
  onSuccess: () => void;
  announcement: {
    id: number;
    name: string;
    description: string;
    date: string;
  };
}

const formatDateTime = (dateTimeString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  return new Date(dateTimeString).toLocaleString(undefined, options);
};

const getannouncementStatus = (date: string): string => {
  const currentDate = new Date();
  const dates = new Date(date);

  const oneHourAhead = new Date(currentDate.getTime() + 60 * 60 * 1000);

  if (oneHourAhead < dates) {
    return "Upcoming";
  } else if (oneHourAhead >= dates && oneHourAhead <= dates) {
    return "Ongoing";
  } else {
    return "Past";
  }
};

const SingleAnouncement: React.FC<SingleAnouncementProps> = ({
  announcement,
  onSuccess,
}) => {
  const announcementStatus = getannouncementStatus(announcement.date);

  let badgeColorScheme: string;

  switch (announcementStatus) {
    case "Upcoming":
      badgeColorScheme = "green";
      break;
    case "Ongoing":
      badgeColorScheme = "blue";
      break;
    case "Past":
      badgeColorScheme = "red";
      break;
    default:
      badgeColorScheme = "red";
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      className="p-4 bg-white w-full rounded-xl shadow-xl cursor-pointer"
      onClick={onOpen}
    >
      <AnnouncementDetail
        onClose={onClose}
        isOpen={isOpen}
        onSuccess={onSuccess}
        announcement={announcement}
      />
      <HiSpeakerphone size={68} className="text-center text-purple-700" />
      <p className="text-neutral-700 font-bold text-2xl pt-3">
        {announcement.name}
      </p>
      <div className="flex items-center justify-between py-3">
        <p className="text-neutral-400 font-medium text-xs">
          Date: {formatDateTime(announcement.date)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-neutral-700 font-bold text-xs">
          {announcement.description.slice(0, 30)}
        </div>
        <Badge ml="1" fontSize="0.8em" colorScheme={badgeColorScheme}>
          {announcementStatus}
        </Badge>
      </div>
    </div>
  );
};

export default SingleAnouncement;
