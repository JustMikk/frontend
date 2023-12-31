import { Badge, useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import EditAnnouncement from "./EditAnnouncement";

interface SingleAnouncementProps {
  onSuccess: () => void;
  event: {
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

const getEventStatus = (date: string): string => {
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
  event,
  onSuccess,
}) => {
  const eventStatus = getEventStatus(event.date);

  let badgeColorScheme: string;

  switch (eventStatus) {
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
  const cancelRef = useRef();

  return (
    <div className="p-4 bg-white w-full rounded-xl shadow-xl" onClick={onOpen}>
      <EditAnnouncement
        onClose={onClose}
        isOpen={isOpen}
        onSuccess={onSuccess}
        event={event}
        cancelRef={cancelRef}
      />
      <HiSpeakerphone size={68} className="text-center text-purple-700" />
      <p className="text-neutral-700 font-bold text-2xl pt-3">{event.name}</p>
      <div className="flex items-center justify-between py-3">
        <p className="text-neutral-400 font-medium text-xs">
          Date: {formatDateTime(event.date)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-neutral-700 font-bold text-xs">
          {event.description.slice(0, 30)}
        </div>
        <Badge ml="1" fontSize="0.8em" colorScheme={badgeColorScheme}>
          {eventStatus}
        </Badge>
      </div>
    </div>
  );
};

export default SingleAnouncement;
