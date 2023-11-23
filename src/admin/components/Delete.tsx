import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  isOpen: any;
  cancelRef: any;
  onClose: any;
  onSuccess: any;
  API_URL: string;
  event: {
    id: number;
    name: string;
  };
}

const Delete: React.FC<Props> = ({
  isOpen,
  cancelRef,
  onClose,
  onSuccess,
  API_URL,
  event,
}) => {
  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios
      .delete(`${API_URL}/${event.id}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      })
      .then(() => {
        toast.success("Announcement deleted");
        onClose();
        onSuccess();
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
        toast.error("Error deleting announcement");
      });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {event.name}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterward.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleFormSubmit} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Delete;
