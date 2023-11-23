import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Checkbox,
  Avatar,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  passed: boolean;
  in_dev: boolean;
  in_cpd: boolean;
  in_cbd: boolean;
}

interface SingleUserProps {
  cancelRef: any;
  onClose: any;
  isOpen: any;
  user: User;
  API_URL: string;
  onSuccess: any;
}

const SingleUser = ({
  onSuccess,
  cancelRef,
  onClose,
  isOpen,
  user,
  API_URL,
}: SingleUserProps) => {
  const [formData, setFormData] = useState({
    passed: user.passed,
    in_cpd: user.in_cpd,
    in_dev: user.in_dev,
    in_cbd: user.in_cbd,
  });
  console.log(user);
  const DeleteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const deleteResponse = await axios.delete(`${API_URL}${user.id}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });

      toast.success("Successfully delleted!");
      onSuccess();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const registrationResponse = await axios.patch(
        `${API_URL}${user.id}/`,
        formData
      );

      toast.success("Successfully saved!");
      onSuccess();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
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
        <AlertDialogHeader>Edit User</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogFooter>
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <Avatar name={`${user.first_name} ${user.last_name}`} />
            <h1 className="font-semibold text-xl">{`${user.first_name} ${user.last_name}`}</h1>
            <h1 className="font-medium">{user.email}</h1>
            <form
              className="grid grid-cols-2 items-center justify-center gap-4 w-full"
              onSubmit={onSubmit}
            >
              <Checkbox
                size="md"
                name="passed"
                colorScheme="green"
                isChecked={formData.passed}
                onChange={onChange}
              >
                Passed
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="green"
                name="in_cpd"
                isChecked={formData.in_cpd}
                onChange={onChange}
              >
                In CPD
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="green"
                name="in_dev"
                isChecked={formData.in_dev}
                onChange={onChange}
              >
                In DEV
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="green"
                name="in_cbd"
                isChecked={formData.in_cbd}
                onChange={onChange}
              >
                In CBD
              </Checkbox>
              <button
                className="ml-24 bg-blue-700 text-white rounded-full py-2 font-semibold text-center w-full mb-10"
                type="submit"
              >
                Save User
              </button>
            </form>
            <div className="flex items-start justify-end my-2">
              <Button
                colorScheme="red"
                onClick={DeleteUser}
                className="flex justify-around gap-2"
              >
                <DeleteIcon />
                Delete User
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SingleUser;
