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
import { HiSpeakerphone } from "react-icons/hi";

interface Props {
  isOpen: any;
  onClose: any;
  onSuccess: any;
  announcement: {
    id: number;
    name: string;
    description: string;
    date: string;
  };
}

const AnnouncementDetail: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  announcement,
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
            <HiSpeakerphone
              size={68}
              className="mx-auto text-center text-purple-700"
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex w-full items-center justify-center gap-4">
              <p className=" font-semibold text-xl">Title:</p>
              <h1 className=" text-2xl font-bold">{announcement.name}</h1>
            </div>
          </ModalBody>

          <ModalBody>
            <p className=" font-semibold">Description: </p>
            <br />
            <span className=" font-semibold text-md">
              {announcement.description}
            </span>
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

export default AnnouncementDetail;
