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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  cancelRef: any;
  onClose: any;
  isOpen: any;
  onSuccess: () => void;
}

const CreateAnnouncement: React.FC<Props> = ({
  cancelRef,
  onClose,
  isOpen,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dates = formData.date || new Date().toISOString();
    const formattedData = {
      ...formData,
      date: dates,
    };

    axios
      .post("http://localhost:8000/api/announcements/", formattedData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      })
      .then(() => {
        toast.success("Announcement created Successfully");
        onClose();
        setFormData({ name: "", description: "", date: "" });
        onSuccess(); // Notify the parent component about the new announcement
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error creating announcement:");
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
          Create Announcement
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
                _hover={{ color: "blue.300" }}
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
            _hover={{ color: "red.200" }}
          >
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateAnnouncement;
