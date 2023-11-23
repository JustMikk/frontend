import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Input,
  Textarea,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Event {
  id: number; // Assuming the id is a number, adjust accordingly
  name: string;
  description: string;
  date: string;
}

interface Props {
  cancelRef: any;
  onClose: any;
  isOpen: any;
  event: Event;
  onSuccess: () => void;
}

const EditAnnouncement: React.FC<Props> = ({
  cancelRef,
  onClose,
  isOpen,
  onSuccess,
  event,
}) => {
  const [formData, setFormData] = useState({
    name: event.name,
    description: event.description,
    date: event.date,
  });

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const dates = formData.date || new Date().toISOString();

    try {
      const formattedData = {
        ...formData,
        date: dates,
      };
      const response = await axios.patch(
        `http://localhost:8000/api/announcements/${event.id}/`,
        formattedData,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
        }
      );

      toast.success("Announcements saved Successfully");
      onClose();
      onSuccess(); // Notify the parent component about the new event
    } catch (error) {
      console.log(error);
      toast.error("Error updating announcements:");
    }
  };
  const handleDeleteSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8000/api/announcements/${event.id}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      })
      .then(() => {
        toast.success("Event deleted");
        onClose();
        onSuccess();
      })
      .catch((error) => {
        console.error("Error deleting announcements:", error);
        toast.error("Error deleting announcements");
      });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader className="bg-gray-800 text-white">
          Update {event.name}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {/* Form for input fields */}
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={4}>
              {/* ... (other form controls) */}
              <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="rounded-md p-2 border border-gray-300"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="rounded-md p-2 border border-gray-300"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Date:</FormLabel>
                <Input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="rounded-md p-2 border border-gray-300"
                />
              </FormControl>

              <Button
                type="submit"
                bg="sky.700"
                _hover="blue.300"
                color="white"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Save
              </Button>
            </Stack>
          </form>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            colorScheme="red"
            onClick={handleDeleteSubmit}
            className="flex justify-around gap-4"
          >
            <DeleteIcon />
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditAnnouncement;
