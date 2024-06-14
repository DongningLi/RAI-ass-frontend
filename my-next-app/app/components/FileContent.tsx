import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { useFileContentContext } from "../context/FileContext";
import {
  TypeOptions,
  convertTypeBack,
  transformOption,
} from "../interface/common";
import { generateNewFile, saveColsTypes } from "../utils/http";

export const FileContent = () => {
  const { recordContent, recordType } = useFileContentContext();
  const [selectedTypes, setSelectedTypes] = useState([] as any);

  // handlers ------------------------------------------------------------------------
  useEffect(() => {
    if (recordType) {
      const typesObject = Object.fromEntries(
        Object.entries(recordType).map(([key, value]) => [key, value])
      );
      setSelectedTypes(typesObject);
    }
  }, [recordType]);

  const beforeUploadingFile = recordContent === undefined && (
    <p className="text-[20px]">No File Uploaded</p>
  );

  const handleChange = (
    colName: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTypes((prevSelectedTypes: any) => ({
      ...prevSelectedTypes,
      [colName]: e.target.value,
    }));
  };

  const handleSaveColsType = () => {
    for (let key in selectedTypes) {
      if (convertTypeBack(selectedTypes[key])) {
        selectedTypes[key] = convertTypeBack(selectedTypes[key]);
      }
    }

    try {
      saveColsTypes(selectedTypes);
    } catch (error) {
      // showSnackbar("Failed to download file", "error");
    }
  };

  const handleGenerateFile = async () => {
    const fileId = selectedTypes.fileId;
    try {
      const response = await generateNewFile(fileId);
      console.log(response);

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement("a");
      link.href = url;

      // Set the file name
      link.setAttribute("download", `downloaded_file.csv`);

      // Append to the document body
      document.body.appendChild(link);

      // Simulate a click to start the download
      link.click();

      // Cleanup
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error generating CSV file:", error);
    }
  };
  // jsx -----------------------------------------------------------------

  const generateOptions = () => {
    return (Object.values(TypeOptions) as string[]).map((value) => (
      <option key={value} value={transformOption(value)}>
        {transformOption(value)}
      </option>
    ));
  };

  const generateHeader = (colTypes: any) => {
    return Object.keys(colTypes)
      .filter((key) => key !== "fileId" && key !== "_id") // Exclude fileId and _id
      .map((key) => (
        <TableCell key={key} className="font-bold text-center">
          {key}
        </TableCell>
      ));
  };

  const generateColContentTypes = () => {
    return Object.keys(selectedTypes)
      .filter((key) => key !== "fileId" && key !== "_id") // Exclude fileId and _id
      .map((key) => (
        <TableCell key={key} className="font-bold text-center">
          {renderTypeOptions(selectedTypes[key], (e) => handleChange(key, e))}
        </TableCell>
      ));
  };

  const generateFileContent = (ColContentForTable: any) => {
    return Object.keys(ColContentForTable)
      .filter((key) => key !== "fileId" && key !== "_id") // Exclude fileId and _id
      .map((key) => (
        <TableCell key={key} className="text-center">
          {ColContentForTable[key]}
        </TableCell>
      ));
  };

  const renderTypeOptions = (
    colType: string,
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined
  ) => {
    console.log("colType:", colType); // Log colType here
    return (
      <select
        className="text-center font-light "
        value={transformOption(colType)}
        onChange={onChange}
      >
        {generateOptions()}
      </select>
    );
  };

  const afterUploadingFile = recordContent && recordType && (
    <div>
      <div className="my-3">
        <label className="text-[20px] font-bold">Records from uploading</label>
      </div>

      <div className="my-3">
        <TableContainer component={Paper} className="w-full">
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>{generateHeader(recordType)}</TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={uuidv4()} className="border-black border-2">
                {generateColContentTypes()}
              </TableRow>
            </TableBody>
            <TableBody>
              {recordContent.map((colContent: any) => (
                <TableRow key={uuidv4()}>
                  {generateFileContent(colContent)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          className={`h-[50px] w-[150px] text-center font-bold my-[10px]`}
          onClick={handleSaveColsType}
        >
          Update Types
        </Button>
        <Button
          variant="contained"
          className={`h-[50px] w-[200px] text-center font-bold my-[10px] float-right`}
          onClick={handleGenerateFile}
        >
          Generate New File
        </Button>
      </div>
    </div>
  );

  // jsx ---------------------------------------------------------------------

  return (
    <div className="flex w-full h-full bg-[#FBF3FB] justify-center items-center">
      <Box>
        {beforeUploadingFile}
        {afterUploadingFile}
      </Box>
    </div>
  );
};
