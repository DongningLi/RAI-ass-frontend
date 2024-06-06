//external import
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import UploadIcon from "@mui/icons-material/Upload";
import { IconButton } from "@mui/material";

const renderNavbar = () => {
  return (
    <Grid
      className={`inset-x-0 absolute bottom-4 items-center justify-center inline-flex`}
    >
      <IconButton aria-label="upload-test" size="large">
        <UploadIcon />
      </IconButton>
    </Grid>
  );
};

function FileOperations() {
  return (
    <div className="w-[362px] min-w-[150px] h-full bg-[#FBF3FB] mr-[12px] relative ">
      {renderNavbar()}
    </div>
  );
}

export default FileOperations;
