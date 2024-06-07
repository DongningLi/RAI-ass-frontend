"use client";

//external import
import React, { createContext, useContext, useState } from "react";

//internal import
import { recordContentType } from "../interface/common";

// context and use context hook ------------------------------------------------
interface FileContentContextInterface {
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

  return (
    <FileContentContext.Provider value={{ recordContent, setRecordContent }}>
      {children}
    </FileContentContext.Provider>
  );
};
