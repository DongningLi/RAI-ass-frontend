//external import
import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8000";

//TODO: Auth before sending
export const setDefaultHeader = (accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export const uploadNewFilelRequest = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(file);

  return await axios.post(`${SERVER_BASE_URL}/upload/`, formData);
};
