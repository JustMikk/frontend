import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Avatar,
} from "@chakra-ui/react";

const UsersTable = () => {
  return (
    <div className="w-full">
      <TableContainer>
        <Table variant="simple">
          <TableCaption>All members</TableCaption>
          <Thead>
            <Tr>
              <Th>Profile</Th>
              <Th>full name</Th>
              <Th isNumeric>email</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Avatar name="Mubarek Shikur" src="" />
              </Td>
              <Td>Mubarek Shikur</Td>
              <Td isNumeric>manmuba90@gmail.com</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
