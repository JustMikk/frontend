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
  id: number;
  name: string;
  description: string;
  platform: string;
  start: string;
  end: string;
}

interface Props {
  cancelRef: any;
  onClose: any;
  isOpen: any;
  event: Event;
  onSuccess: () => void;
}

const EditEvent: React.FC<Props> = ({
  cancelRef,
  onClose,
  isOpen,
  onSuccess,
  event,
}) => {
  const [formData, setFormData] = useState({
    name: event.name,
    description: event.description,
    platform: event.platform,
    start: event.start,
    end: event.end,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDate = formData.start || new Date().toISOString();
    const endDate = formData.end || new Date().toISOString();
    const formattedData = {
      ...formData,
      start: startDate,
      end: endDate,
    };

    axios
      .patch(`http://localhost:8000/api/events/${event.id}/`, formattedData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      })
      .then(() => {
        toast.success("Event saved Successfully");
        onClose();
        onSuccess(); // Notify the parent component about the new event
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error updating event:");
      });
  };

  const handleDeleteSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8000/api/events/${event.id}/`, {
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
        console.error("Error deleting event:", error);
        toast.error("Error deleting event");
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
                <FormLabel>Platform:</FormLabel>
                <InputGroup>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.platform}
                    onChange={(e) => handleChange("platform", e.target.value)}
                    className="rounded-md p-2 border border-gray-300"
                  />
                  <InputRightAddon children=".com" className="bg-gray-200" />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Start Date:</FormLabel>
                <Input
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => handleChange("start", e.target.value)}
                  className="rounded-md p-2 border border-gray-300"
                />
              </FormControl>

              <FormControl>
                <FormLabel>End Date:</FormLabel>
                <Input
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => handleChange("end", e.target.value)}
                  className="rounded-md p-2 border border-gray-300"
                />
              </FormControl>

              <Button
                type="submit"
                bg="sky.700"
                _hover={{ color: "blue.300" }}
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

export default EditEvent;
