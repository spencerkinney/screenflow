import axios from 'axios';

const ROBOFLOW_API_KEY = process.env.REACT_APP_ROBOFLOW_API_KEY;
const MODEL_ENDPOINT = "https://detect.roboflow.com/icon-detection-tcjel/2";

export const detectIcons = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await axios({
      method: "POST",
      url: MODEL_ENDPOINT,
      params: {
        api_key: ROBOFLOW_API_KEY,
      },
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error detecting icons:", error);
    throw error;
  }
};