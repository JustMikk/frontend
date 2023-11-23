import { DeleteIcon } from "@chakra-ui/icons";
import { Badge, Button, useDisclosure } from "@chakra-ui/react";
import { GiTrophyCup } from "react-icons/gi";
import { Link } from "react-router-dom"; // Import Link here
import Delete from "./Delete";
import { useRef } from "react";
import EditEvent from "./EditEvent";

interface SingleEventProps {
  onSuccess: any;
  event: {
    id: number;
    name: string;
    description: string;
    platform: string;
    start: string;
    end: string;
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  let badgeColorScheme: string;

  switch (eventStatus) {
    case "Upcoming":
      badgeColorScheme = "green";
      break;
    case "Ongoing":
      badgeColorScheme = "blue";
      break;
    case "Past":
      badgeColorScheme = "red"; // or any other color you prefer for past events
      break;
    default:
      badgeColorScheme = "red"; // default to gray if the status is not recognized
  }

  return (
    <div
      className="p-4 bg-white w-full rounded-xl shadow-xl flex flex-col gap-2 pb-8"
      onClick={onOpen}
    >
      <EditEvent
        onClose={onClose}
        isOpen={isOpen}
        onSuccess={onSuccess}
        event={event}
        cancelRef={cancelRef}
      />
      <GiTrophyCup className="text-yellow-500" size="68" />
      <p className="text-neutral-700 font-bold text-2xl">{event.name}</p>
      <div className="flex items-center justify-between">
        <p className="text-neutral-400 font-medium text-xs">
          Start: {formatDateTime(event.start)}
        </p>
        <p className="text-neutral-400 font-medium text-xs">
          End: {formatDateTime(event.end)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Link
          to={event.platform}
          className="text-neutral-700 font-bold text-xs"
        >
          {event.platform}
        </Link>
        <Badge ml="1" fontSize="0.8em" colorScheme={badgeColorScheme}>
          {eventStatus}
        </Badge>
      </div>
      {/* <div className="flex items-start justify-end mt-5">
        <Button
          colorScheme="red"
          onClick={onOpen}
          className="flex justify-around gap-2"
        >
          <DeleteIcon />
          Delete
        </Button>
      </div>
      <Delete
        onClose={onClose}
        isOpen={isOpen}
        API_URL="http://localhost:8000/api/events"
        onSuccess={onSuccess}
        event={event}
        cancelRef={cancelRef}
      /> */}
    </div>
  );
};

export default SingleEvent;
