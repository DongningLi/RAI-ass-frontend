"use client";
import { FileContent } from "./components/FileContent";
import FileOperations from "./components/FileOperations";
import { FileContentContextProvider } from "./context/FileContext";
import { SnackbarProvider } from "./context/SnackbarContext";

const Page = () => {
  // jsx ---------------------------------------------------------------------
  return (
    <FileContentContextProvider>
      <SnackbarProvider>
        <div className="flex h-dvh h-lvh">
          <FileOperations />
          <FileContent />
        </div>
      </SnackbarProvider>
    </FileContentContextProvider>
  );
};

export default Page;
