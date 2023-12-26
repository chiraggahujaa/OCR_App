import React, { useState } from "react";
import FilterData from "./Components/Filter/FilterData";
import {
  Box,
  ChakraProvider,
  extendTheme,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Heading
} from "@chakra-ui/react";
import OCRResult from "./Components/OCR/OCRResult";
import OCRImage from "./Components/OCR/OCRImage";

function App() {
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const customTheme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "gray.800", // Set your dark background color here
          backgroundImage: `url(${"./images/main-image.jpeg"})`, // Set your background image here
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={customTheme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={20}
        bgImage={"./images/main-image.jpeg"}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <Box
          className="app-container"
          // minHeight="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          w="600px"
          bg="white" // Set your box background color here
          p={8}
          borderRadius="md"
          boxShadow="md"
        >
          <Heading mb={4}>Thai ID Card OCR</Heading>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Extract Data</Tab>
              <Tab>Filter Data</Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <OCRImage
                  image={image}
                  ocrResult={ocrResult}
                  setImage={setImage}
                  setOcrResult={setOcrResult}
                  setErrorMessage={setErrorMessage}
                />
                <OCRResult ocrResult={ocrResult} />
              </TabPanel>
              <TabPanel
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <FilterData />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
