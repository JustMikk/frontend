import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { GiTrophyCup } from "react-icons/gi";
import { Link } from "react-router-dom";

interface Props {
  isOpen: any;
  onClose: any;
  onSuccess: any;
  event: {
    id: number;
    name: string;
    description: string;
    start: string;
    end: string;
    platform: string;
  };
}

const EventDetail: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  event,
}) => {
  return (
    <div className="w-[80vw] md:w-[60vw]">
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          onSuccess();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <GiTrophyCup
              size={68}
              className="mx-auto text-center text-yellow-500"
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex w-full items-center justify-center gap-4">
              <p className=" font-semibold text-xl">Title:</p>
              <h1 className=" text-2xl font-bold">{event.name}</h1>
            </div>
          </ModalBody>

          <ModalBody>
            <p className=" font-semibold">Description: </p>
            <span className=" font-semibold text-md">{event.description}</span>
          </ModalBody>
          <ModalBody>
            <p className=" font-semibold">Starts at: </p>
            <span className=" font-semibold text-md">{event.start}</span>
          </ModalBody>
          <ModalBody>
            <p className=" font-semibold">Ends at: </p>
            <span className=" font-semibold text-md">{event.end}</span>
          </ModalBody>
          <ModalBody>
            <p className=" font-semibold">Link: </p>
            <Link to={event.platform} className=" font-semibold text-md">
              {event.platform}
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onClose();
                onSuccess();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EventDetail;
