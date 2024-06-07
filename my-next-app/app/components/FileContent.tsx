import React from "react";
import {
  Box,
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

export const FileContent = () => {
  const { recordContent } = useFileContentContext();

  //handler
  const beforeUploadingFile = recordContent === undefined && (
    <p className="text-[20px]">No File Uploaded</p>
  );

  const afterUploadingFile = recordContent !== undefined && (
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
              <TableRow>
                <TableCell className="font-bold text-center">Name</TableCell>
                <TableCell className="font-bold text-center">
                  Birthdate
                </TableCell>
                <TableCell className="font-bold text-center">Score</TableCell>
                <TableCell className="font-bold text-center">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recordContent.map((record) => (
                <TableRow key={uuidv4()}>
                  <TableCell className="text-center">{record.Name}</TableCell>
                  <TableCell className="text-center">
                    {record.Birthdate}
                  </TableCell>
                  <TableCell className="text-center">{record.Score}</TableCell>
                  <TableCell className="text-center">{record.Grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
