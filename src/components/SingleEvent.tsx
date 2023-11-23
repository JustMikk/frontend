import { Badge, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { GiTrophyCup } from "react-icons/gi";
import EventDetail from "./EventDetails";

interface SingleEventProps {
  onSuccess: () => void;
  event: {
    id: number;
    name: string;
    description: string;
    start: string;
    end: string;
    platform: string;
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

const getEventStatus = (start: string, end: string): string => {
  const currentDate = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (currentDate < startDate) {
    return "Upcoming";
  } else if (currentDate >= startDate && currentDate <= endDate) {
    return "Ongoing";
  } else {
    return "Past";
  }
};

const SingleEvent: React.FC<SingleEventProps> = ({ event, onSuccess }) => {
  const eventStatus = getEventStatus(event.start, event.end);

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

  return (
    <div
      className="p-4 bg-white w-full rounded-xl shadow-xl cursor-pointer"
      onClick={onOpen}
    >
      <EventDetail
        onClose={onClose}
        isOpen={isOpen}
        onSuccess={onSuccess}
        event={event}
      />
      <GiTrophyCup size={68} className="text-center text-yellow-500" />
      <p className="text-neutral-700 font-bold text-2xl pt-3">{event.name}</p>
      <div className="flex items-center justify-between py-3">
        <p className="text-neutral-400 font-medium text-xs">
          Start: {formatDateTime(event.start)}
        </p>
        <p className="text-neutral-400 font-medium text-xs">
          End: {formatDateTime(event.end)}
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

export default SingleEvent;
