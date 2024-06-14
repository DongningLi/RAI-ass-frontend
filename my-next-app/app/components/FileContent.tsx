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
import { TypeOptions, transformOption } from "../interface/common";
import { saveColsTypes } from "../utils/http";

export const FileContent = () => {
  const { recordContent, recordType } = useFileContentContext();
  const [selectedTypes, setSelectedTypes] = useState([] as any);

  // handlers ------------------------------------------------------------------------
  useEffect(() => {
    if (recordType) {
      const typesObject = Object.fromEntries(
        Object.entries(recordType).map(([key, value]) => [
          key,
          transformOption(value as string),
        ])
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
    saveColsTypes(selectedTypes);
  };

  // jsx -----------------------------------------------------------------
  const renderTypeOptions = (
    colType: string,
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined
  ) => {
    console.log("colType:", colType); // Log colType here
    return (
      <select
        className="text-center font-light "
        value={colType}
        onChange={onChange}
      >
        <option value={transformOption(TypeOptions.Text)}>
          {transformOption(TypeOptions.Text)}
        </option>
        <option value={transformOption(TypeOptions.Int)}>
          {transformOption(TypeOptions.Int)}
        </option>
        <option value={transformOption(TypeOptions.Float)}>
          {transformOption(TypeOptions.Float)}
        </option>
        <option value={transformOption(TypeOptions.Date)}>
          {transformOption(TypeOptions.Date)}
        </option>
        <option value={transformOption(TypeOptions.Complex)}>
          {transformOption(TypeOptions.Complex)}
        </option>
        <option value={transformOption(TypeOptions.Time)}>
          {transformOption(TypeOptions.Time)}
        </option>
        <option value={transformOption(TypeOptions.Category)}>
          {transformOption(TypeOptions.Category)}
        </option>
      </select>
    );
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

  const afterUploadingFile = recordContent && recordType && (
    <div>
      <div className="my-3">
        <label className="text-[20px] font-bold">
          Records from last uploading
        </label>
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
          variant="outlined"
          className={`h-[50px] w-[150px] text-center font-bold my-[10px] float-right`}
          onClick={handleSaveColsType}
        >
          Save Types
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
