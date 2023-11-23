import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CreateProps {
  cancelRef: any;
  onClose: any;
  isOpen: any;
  onSuccess: any;
}

const API_URL = "http://localhost:8000/auth";

const CreateUser = ({ cancelRef, onClose, isOpen, onSuccess }: CreateProps) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Validation
      if (
        !formData.first_name ||
        !formData.last_name ||
        !formData.email ||
        !formData.password
      ) {
        toast.error("Please fill in all fields");
        return;
      }

      // Registration
      const registrationResponse = await axios.post(
        `${API_URL}/users/`,
        formData
      );

      toast.success("Successfully registered!");
      onClose();
      setFormData({ first_name: "", last_name: "", email: "", password: "" });
      onSuccess();
    } catch (error) {
      // Handle errors
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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

      <AlertDialogContent>
        <AlertDialogHeader>Add new User</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogFooter>
          {/* <Button ref={cancelRef} onClick={onClose}>
            No
          </Button> */}
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <form
              action=""
              className="flex flex-col gap-4 w-full"
              onSubmit={onSubmit}
            >
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formData.first_name}
                onChange={onChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formData.last_name}
                onChange={onChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formData.email}
                onChange={onChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formData.password}
                onChange={onChange}
              />
              <button
                className=" bg-blue-700 text-white rounded-full py-2 font-semibold text-center w-full mb-10"
                type="submit"
              >
                Add User
              </button>
            </form>
          </div>
          {/* <Button colorScheme="red" ml={3}>
            Yes
          </Button> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateUser;
