import { Box, Heading, List, ListItem } from "@chakra-ui/react";

const OCRResult = (props) => {
  const { ocrResult } = props;

  return (
    <>
      {ocrResult && (
        <Box className="ocr-result" mt={4}>
          {/* <Heading as="h2" size="md">
            Extracted Data
          </Heading> */}
          <List>
            <ListItem>
              Identification Number: {ocrResult.identificationNo || "N/A"}
            </ListItem>
            <ListItem>First Name: {ocrResult.firstName || "N/A"}</ListItem>
            <ListItem>Last Name: {ocrResult.lastName || "N/A"}</ListItem>
            <ListItem>
              Date of Birth:{" "}
              {ocrResult.dateOfBirth
                ? new Date(ocrResult.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </ListItem>
            <ListItem>
              Expiry Date:{" "}
              {ocrResult.expiryDate
                ? new Date(ocrResult.expiryDate).toLocaleDateString()
                : "N/A"}
            </ListItem>
            <ListItem>
              Date of Issue:{" "}
              {ocrResult.issueDate
                ? new Date(ocrResult.issueDate).toLocaleDateString()
                : "N/A"}
            </ListItem>
          </List>
        </Box>
      )}
    </>
  );
};

export default OCRResult;
