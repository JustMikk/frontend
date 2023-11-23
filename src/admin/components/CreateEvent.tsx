// CreateEvent.tsx
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
import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";

interface Props {
  cancelRef: any;
  onClose: any;
  isOpen: any;
  onSuccess: () => void;
}

const CreateEvent: React.FC<Props> = ({
  cancelRef,
  onClose,
  isOpen,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platform: "",
    start: "",
    end: "",
  });

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const startDate = formData.start || new Date().toISOString();
    const endDate = formData.end || new Date().toISOString();
    const formattedData = {
      ...formData,
      start: startDate,
      end: endDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/events/",
        formattedData,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
        }
      );

      toast.success("Event created Successfully");
      onClose();
      onSuccess(); // Notify the parent component about the new event
    } catch (error) {
      console.log(error);
      toast.error("Error creating event:");
    }
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
          Create Event
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
                _hover="blue.300"
                color="white"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Create
              </Button>
            </Stack>
          </form>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            onClick={onClose}
            className="bg-gray-300 p-2 rounded-md"
            color="white"
            bg="red"
            _hover="red.200"
          >
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateEvent;
