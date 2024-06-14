"use client";

//external import
import React, { createContext, useContext, useState } from "react";

// context and use context hook ------------------------------------------------
interface FileContentContextInterface {
  recordType: any | undefined;
  setRecordType: React.Dispatch<React.SetStateAction<any | undefined>>;
  recordContent: any | undefined;
  setRecordContent: React.Dispatch<React.SetStateAction<any[] | undefined>>;
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
  const [recordContent, setRecordContent] = useState<any[] | undefined>();

  const [recordType, setRecordType] = useState<any | undefined>();

  return (
    <FileContentContext.Provider
      value={{ recordContent, setRecordContent, recordType, setRecordType }}
    >
      {children}
    </FileContentContext.Provider>
  );
};
