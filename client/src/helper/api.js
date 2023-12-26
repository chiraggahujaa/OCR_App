import axios from "axios";
import { extractThaiIDCardData } from "../Components/OCR/ocrUtils";

export const uploadImage = (
  selectedFile,
  setImage,
  setOcrResult,
  setErrorMessage
) => {
  if (!selectedFile) return;

  setImage(selectedFile);
  setOcrResult(null);
  setErrorMessage("");
};

export const processImage = async (
  image,
  setOcrResult,
  setIsLoading,
  toast
) => {
  setIsLoading(true);
  if (!image) {
    toast({
      title: "Upload Image",
      description: "Please Upload Image First!",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    setIsLoading(false);
    return;
  }

  const base64Image = await convertImageToBase64(image);
  try {
    const requestData = {
      requests: [
        {
          image: { content: base64Image },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        },
      ],
    };
    const { data } = await axios.post(
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBGxOf7sgo5ZPoPp4EAP-pic-6x0Nh92gQ",
      requestData
    );
    const extractedData = extractThaiIDCardData(
      data.responses[0].fullTextAnnotation.text
    );
    console.log(extractedData);

    const identificationNoExists = await axios.get(
      `https://ocrappbackend.onrender.com/api/idCard/${extractedData.identificationNo}`
    );

    if (!identificationNoExists.data) {
      const resp = await axios.post(
        "https://ocrappbackend.onrender.com/api/idCard",
        extractedData
      );
      console.log(resp);
    }
    
    setOcrResult(extractedData);
  } catch (error) {
    toast({
      title: "Image Error",
      description: "Error processing image!",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  finally{
    setIsLoading(false);
  }
};

export const convertImageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(imageFile);
  });
};
