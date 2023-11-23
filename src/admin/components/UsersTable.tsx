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
import React from "react";
import SingleUser from "./SingleUser";

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

interface Props {
  users: User[]; // Corrected the type to an array
  API_URL: string;
  onSuccess: any;
}

const UsersTable: React.FC<Props> = ({ users, API_URL, onSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <div className="w-full">
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
                <Td
                  onClick={() => handleUserClick(user)}
                  className="cursor-pointer"
                >
                  <Avatar
                    name={`${user.first_name} ${user.last_name}`}
                    src=""
                  />
                </Td>
                <Td
                  onClick={() => handleUserClick(user)}
                  className="cursor-pointer"
                >
                  {`${user.first_name} ${user.last_name}`}
                </Td>
                <Td
                  onClick={() => handleUserClick(user)}
                  className="cursor-pointer"
                  isNumeric
                >
                  {user.email}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <SingleUser
          onSuccess={onSuccess}
          onClose={() => {
            onClose();
            setSelectedUser(null);
          }}
          isOpen={isOpen}
          cancelRef={cancelRef}
          user={selectedUser}
          API_URL={API_URL}
        />
      )}
    </div>
  );
};

export default UsersTable;
