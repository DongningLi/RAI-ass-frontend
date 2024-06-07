//external import

import UploadIcon from "@mui/icons-material/Upload";
import { Box, IconButton } from "@mui/material";
import BasicModal from "./wrappers/BasicModal";
import NewFileUploadedModal from "./modals/NewFileUploadedModal";

function FileOperations() {
  return (
    <div className="flex w-[362px] min-w-[150px] h-full bg-[#FBF3FB] mr-[12px] justify-center items-center ">
      <Box>
        <BasicModal modalContent={<NewFileUploadedModal />}>
          Upload File
          <IconButton size="large">
            <UploadIcon />
          </IconButton>
        </BasicModal>
      </Box>
    </div>
  );
}

export default FileOperations;
