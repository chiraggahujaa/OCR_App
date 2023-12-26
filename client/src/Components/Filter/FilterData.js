import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  Td
} from "@chakra-ui/react";

const FilterData = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleDateFilter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/idCard/date/${selectedDate}`
      );
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data by date:", error);
    }
  };

  const handleStatusFilter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/idCard/status/${selectedStatus}`
      );
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data by status:", error);
    }
  };

  return (
    <VStack align="center" spacing={4}>
      <Flex display="flex" align="center">
        <Box>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Box>
        <Button colorScheme="blue" ml={4} onClick={handleDateFilter}>
          Filter by Date
        </Button>
      </Flex>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {filteredData.length === 0 ? (
          <Text>No data to display</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Date and Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((item) => (
                <Tr key={item.identificationNo}>
                  <Td>{item.firstName}</Td>
                  <Td>{item.lastName}</Td>
                  <Td>{new Date(item.timestamp).toLocaleString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </VStack>
  );
};

export default FilterData;
