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
  recordContentType,
  recordTypesType,
} from "../interface/common";
import { saveColsTypes } from "../utils/http";

export const FileContent = () => {
  const { recordContent, recordType } = useFileContentContext();
  const [selectedTypes, setSelectedTypes] = useState({
    Name: "",
    Birthdate: "",
    Score: "",
    Grade: "",
  });

  // handlers ------------------------------------------------------------------------
  useEffect(() => {
    if (recordType) {
      setSelectedTypes({
        Name: recordType.Name,
        Birthdate: recordType.Birthdate,
        Score: recordType.Score,
        Grade: recordType.Grade,
      });
    }
  }, [recordType]);

  const transformOption = (option: string) => {
    switch (option) {
      case TypeOptions.Date:
        return "Date";
      case TypeOptions.Text:
        return "Text";
      case TypeOptions.Float:
        return "Float";
      case TypeOptions.Int:
        return "Int";
      case TypeOptions.Time:
        return "Time Difference";
      default:
        return option;
    }
  };

  const beforeUploadingFile = recordContent === undefined && (
    <p className="text-[20px]">No File Uploaded</p>
  );

  const handleChange = (
    colName: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTypes((prevSelectedTypes) => ({
      ...prevSelectedTypes,
      [colName]: e.target.value,
    }));
  };

  const handleSaveColsType = () => {
    saveColsTypes(selectedTypes);
  };

  // jsx -----------------------------------------------------------------
  const renderOptions = (
    colType: string | number | readonly string[] | undefined,
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined
  ) => (
    <select
      className="text-center font-light "
      value={colType}
      onChange={onChange}
    >
      <option value={TypeOptions.Text}>
        {transformOption(TypeOptions.Text)}
      </option>
      <option value={TypeOptions.Int}>
        {transformOption(TypeOptions.Int)}
      </option>
      <option value={TypeOptions.Float}>
        {transformOption(TypeOptions.Float)}
      </option>
      <option value={TypeOptions.Date}>
        {transformOption(TypeOptions.Date)}
      </option>
      <option value={TypeOptions.Complex}>
        {transformOption(TypeOptions.Complex)}
      </option>
      <option value={TypeOptions.Time}>
        {transformOption(TypeOptions.Time)}
      </option>
      <option value={TypeOptions.Category}>
        {transformOption(TypeOptions.Category)}
      </option>
    </select>
  );

  const generateHeader = (colTypes: recordTypesType) => {
    return Object.keys(colTypes)
      .filter((key) => key !== "fileId" && key !== "_id") // Exclude fileId and _id
      .map((key) => (
        <TableCell key={key} className="font-bold text-center">
          {key}
        </TableCell>
      ));
  };

  const generateFileContent = (ColContentForTable: recordContentType) => {
    return Object.keys(ColContentForTable)
      .filter((key) => key !== "fileId" && key !== "_id") // Exclude fileId and _id
      .map((key) => (
        <TableCell key={key} className="text-center">
          {ColContentForTable[key as keyof recordContentType]}
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
                <TableCell>
                  {renderOptions(selectedTypes.Name, (e) =>
                    handleChange("Name", e)
                  )}
                </TableCell>
                <TableCell>
                  {renderOptions(selectedTypes.Birthdate, (e) =>
                    handleChange("Birthdate", e)
                  )}
                </TableCell>
                <TableCell>
                  {renderOptions(selectedTypes.Score, (e) =>
                    handleChange("Score", e)
                  )}
                </TableCell>
                <TableCell>
                  {renderOptions(selectedTypes.Grade, (e) =>
                    handleChange("Grade", e)
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              {recordContent.map((colContent) => (
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
