"use client";
import { FileContent } from "./components/FileContent";
import FileOperations from "./components/FileOperations";
import { FileContentContextProvider } from "./context/FileContext";

const Page = () => {
  // jsx ---------------------------------------------------------------------
  return (
    <FileContentContextProvider>
      <div className="flex h-dvh h-lvh">
        <FileOperations />
        <FileContent />
      </div>
    </FileContentContextProvider>
  );
};

export default Page;
