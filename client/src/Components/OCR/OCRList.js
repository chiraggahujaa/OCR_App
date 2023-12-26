import React, { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import axios from 'axios';

function OCRList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ocr');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="container" mt={5}>
      <Heading as="h2" mb={4}>
        OCR Data
      </Heading>
      <List className="list-group" mt={4}>
        {data.map((item) => (
          <ListItem key={item.id} className="list-group-item" mb={2}>
            {item.name} {item.last_name} - {item.identification_number}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default OCRList;
