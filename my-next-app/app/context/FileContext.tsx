"use client";

//external import
import React, { createContext, useContext, useState } from "react";

//internal import
import { recordContentType, recordTypesType } from "../interface/common";

// context and use context hook ------------------------------------------------
interface FileContentContextInterface {
  recordType: recordTypesType | undefined;
  setRecordType: React.Dispatch<
    React.SetStateAction<recordTypesType | undefined>
  >;
  recordContent: recordContentType[] | undefined;
  setRecordContent: React.Dispatch<
    React.SetStateAction<recordContentType[] | undefined>
  >;
}

const FileContentContext = createContext<
  FileContentContextInterface | undefined
>(undefined);

export const useFileContentContext = () => {
  const context = useContext(FileContentContext);

  if (context === undefined) {
    throw new Error("FileContentContext is not defiend");
  }
  return context;
};

export const FileContentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [recordContent, setRecordContent] = useState<
    recordContentType[] | undefined
  >();

  const [recordType, setRecordType] = useState<recordTypesType | undefined>();

  return (
    <FileContentContext.Provider
      value={{ recordContent, setRecordContent, recordType, setRecordType }}
    >
      {children}
    </FileContentContext.Provider>
  );
};
