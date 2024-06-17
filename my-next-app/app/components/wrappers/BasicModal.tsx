// external import
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

// internal import
import { PopupModalProvider } from "../modals/PopupModal";

const baseStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "8px solid gray",
  boxShadow: 24,
  p: 1,
  width: 400,
  Height: 400,
};

interface BasicModalProps {
  children: React.ReactNode;
  modalContent: React.ReactNode;
  modalWidth?: string;
}

const BasicModal = ({ children, modalContent }: BasicModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...baseStyle }}>
          <Box className="flex justify-end">
            <button type="button" onClick={() => setOpen(false)}>
              <div className="w-[28px] rounded-full border-[2px] border-[black] ">
                <CloseIcon />
              </div>
            </button>
          </Box>
          <PopupModalProvider value={{ handleModalClose: handleClose }}>
            {modalContent}
          </PopupModalProvider>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
