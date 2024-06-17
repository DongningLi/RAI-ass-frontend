import { Button } from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { uploadNewFilelRequest } from "@/app/utils/http";
import { useFileContentContext } from "@/app/context/FileContext";
import { usePopupModalContext } from "./PopupModal";
import { useSnackbar } from "@/app/context/SnackbarContext";
import { AxiosError } from "axios";

type NewFileFormInputs = {
  file: FileList;
};

const NewFileUploadedModal = () => {
  // hooks -------------------------------------------------------------------

  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewFileFormInputs>();

  const { setRecordContent, recordType, setRecordType } =
    useFileContentContext();
  const { handleModalClose } = usePopupModalContext();

  // handlers ----------------------------------------------------------------

  const onSubmit: SubmitHandler<NewFileFormInputs> = async (formData) => {
    const file = formData.file[0];

    try {
      const response = await uploadNewFilelRequest(file);

      const fileData = response.data;

      const fileContentsUploaded = fileData.contents;
      const fileTypeUploaded = fileData.types;

      setRecordContent(fileContentsUploaded);
      setRecordType(fileTypeUploaded);
    } catch (error) {
      if (error instanceof AxiosError) {
        showSnackbar(
          `Failed to submit file: ${error.response?.data.error}`,
          "error"
        );
      } else {
        showSnackbar("Failed to submit file.", "error");
      }
    } finally {
      handleModalClose();
    }
  };

  // jsx ---------------------------------------------------------------------

  const fileInput = (
    <div className="m-[50px] ">
      <input
        type="file"
        accept=".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        {...register("file", { required: true })}
      />
      {errors.file && <p className="text-red-500">File is required</p>}
    </div>
  );

  return (
    <div className="p-[16px]">
      <form className="justify-center">
        {fileInput}
        <div className="flex justify-end">
          <Button onClick={handleSubmit(onSubmit)} variant="outlined">
            Upload File
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewFileUploadedModal;
