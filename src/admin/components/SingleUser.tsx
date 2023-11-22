import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Checkbox,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SingleUserProps {
  cancelRef: any;
  onClose: any;
  isOpen: any;
  user: any;
  API_URL: string;
}

const SingleUser = ({
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const registrationResponse = await axios.patch(
        `${API_URL}${user.id}/`,
        formData
      );

      toast.success("Successfully saved!");
    } catch (error) {
      console.error(error);
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
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SingleUser;
