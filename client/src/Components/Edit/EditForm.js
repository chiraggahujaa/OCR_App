import React from "react";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import EditFormModal from "./EditFormModal";

const EditForm = ({ data, onSubmit, isEditing }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={() => {
          if (!data) {
            toast({
              title: "Extract Data",
              description: "Please Extract Data to Edit it!",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            return;
          }
          onOpen();
        }}
      >
        Edit Details
      </Button>
      <EditFormModal
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        finalRef={finalRef}
        onSubmit={onSubmit}
        data={data}
        isEditing={isEditing}
      />
    </>
  );
};

export default EditForm;
