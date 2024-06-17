//external import
import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8000";

// upload file and receive content and types
export const uploadNewFilelRequest = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post(`${SERVER_BASE_URL}/upload/`, formData);
};

// save manually selected types
export const saveColsTypesRequest = async (selectedTypes: any) => {
  const recordTypesStr = JSON.stringify(selectedTypes);
  const formData = new FormData();
  formData.append("data", recordTypesStr);

  return await axios.post(`${SERVER_BASE_URL}/savecolstypes/`, formData);
};

// generate files
export const generateNewFileRequest = async (fileId: string) => {
  return await axios.post(`${SERVER_BASE_URL}/generateNewFile/${fileId}/`, {});
};
