import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function OCRForm({ onUpload }) {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('https://ocrappbackend.onrender.com/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpload(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Box className="container" mt={5}>
      <Heading as="h2" mb={4}>
        Upload Thai ID Card Image
      </Heading>
      <form onSubmit={handleSubmit} className="mt-4">
        <FormControl mb={3}>
          <FormLabel>Choose Image</FormLabel>
          <Input type="file" className="form-control" onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Upload
        </Button>
      </form>
    </Box>
  );
}

export default OCRForm;
