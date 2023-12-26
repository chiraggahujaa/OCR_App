import { Box, Heading, Input, Button, Image, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { uploadImage, processImage } from "../../helper/api";
import axios from "axios";
import EditForm from "../Edit/EditForm";
import { BeatLoader } from "react-spinners";

const OCRImage = (props) => {
  const { image, ocrResult, setImage, setOcrResult, setErrorMessage } = props;

  const inputRef = useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageInputClick = () => {
    inputRef.current.click();
  };

  const handleImageInputChange = (e) => {
    // Handle image input change logic here
    const selectedFile = e.target.files[0];
    uploadImage(selectedFile, setImage, setOcrResult, setErrorMessage);
    // Do something with the selectedFile
  };

  const handleProcess = () => {
    processImage(image, setOcrResult, setIsLoading, toast);
  };

  const handleEditSubmit = async (updatedData) => {
    setIsEditing(true);
    try {
      // Make the PUT request to update the data
      const response = await axios.put(
        `http://localhost:5000/api/idCard/${ocrResult.identificationNo}`,
        { identificationNo: ocrResult.identificationNo, ...updatedData }
      );

      setOcrResult({
        identificationNo: ocrResult.identificationNo,
        ...updatedData,
      });
      console.log("Edit successful:", response.data);
    } catch (error) {
      // Handle errors if the PUT request fails
      setErrorMessage("");
      console.error("Error updating data:", error);
      toast({
        title: "Error updating data!",
        description: "Cannot update data, please check the inputs again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsEditing(false);
  };

  return (
    <>
      <Button onClick={handleImageInputClick} mb={4} colorScheme="teal">
        Take Image Input
      </Button>
      <Input
        type="file"
        accept="image/jpeg, image/png"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleImageInputChange}
      />
      {image && (
        <Image
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          maxW="300px"
          mb={4}
        />
      )}
      <Box display="flex">
        <Button
          isLoading={isLoading}
          spinner={<BeatLoader size={8} color="white" />}
          colorScheme="teal"
          onClick={handleProcess}
          mb={4}
          mr={5}
        >
          Process Image
        </Button>
        <EditForm
          data={ocrResult}
          onSubmit={handleEditSubmit}
          isEditing={isEditing}
        />
      </Box>
    </>
  );
};

export default OCRImage;
