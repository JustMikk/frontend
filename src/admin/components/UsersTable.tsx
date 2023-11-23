import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SingleUser from "./SingleUser";
import axios from "axios";

interface User {
  email: string;
  first_name: string;
  last_name: string;
  passed: boolean;
  in_dev: boolean;
  in_cpd: boolean;
  in_cbd: boolean;
}

interface Props {
  API_URL: string;
}

const UsersTable: React.FC<Props> = ({ API_URL }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLInputElement | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>(`${API_URL}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="w-full ">
      <TableContainer>
        <Table variant="simple">
          <TableCaption>All members</TableCaption>
          <Thead>
            <Tr>
              <Th>Profile</Th>
              <Th>Full Name</Th>
              <Th isNumeric>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.email}>
                <SingleUser
                  onClose={onClose}
                  isOpen={isOpen}
                  cancelRef={cancelRef}
                  user={user}
                  API_URL={API_URL}
                />
                <Td onClick={onOpen} className="cursor-pointer">
                  <Avatar
                    name={`${user.first_name} ${user.last_name}`}
                    src=""
                  />
                </Td>
                <Td onClick={onOpen} className="cursor-pointer">
                  {`${user.first_name} ${user.last_name}`}
                </Td>
                <Td onClick={onOpen} className="cursor-pointer" isNumeric>
                  {user.email}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
