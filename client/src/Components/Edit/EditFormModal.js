import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditFormModal = (props) => {
  const { initialRef, finalRef, isOpen, onClose, onSubmit, data, isEditing } =
    props;

  // State to manage form values
  const [formData, setFormData] = useState({
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    dateOfBirth: data?.dateOfBirth || "",
    issueDate: data?.issueDate || "",
    expiryDate: data?.expiryDate || "",
  });

  useEffect(() => {
    setFormData({
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      dateOfBirth: data?.dateOfBirth || "",
      issueDate: data?.issueDate || "",
      expiryDate: data?.expiryDate || "",
    });
  }, [data])

  // Function to handle changes in form fields
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              placeholder="Date of Birth"
              value={new Date(formData.dateOfBirth).toLocaleDateString()}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Issue Date</FormLabel>
            <Input
              placeholder="Issue Date"
              value={new Date(formData.issueDate).toLocaleDateString()}
              onChange={(e) => handleInputChange("issueDate", e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              placeholder="Expiry Date"
              value={new Date(formData.expiryDate).toLocaleDateString()}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onSubmit(formData);
              onClose();
            }}
            isLoading={isEditing}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditFormModal;
