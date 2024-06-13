import { Button } from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { uploadNewFilelRequest } from "@/app/utils/http";
import { recordContentType, recordTypesType } from "@/app/interface/common";
import { useFileContentContext } from "@/app/context/FileContext";
import { usePopupModalContext } from "./PopupModal";

type NewFileFormInputs = {
  file: FileList;
};

const NewFileUploadedModal = () => {
  // hooks -------------------------------------------------------------------
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

      const fileContentsUploaded = fileData.contents as recordContentType[];
      const fileTypeUploaded = fileData.types as recordTypesType;

      setRecordContent(fileContentsUploaded);
      setRecordType(fileTypeUploaded);
    } catch (err) {
      if (err instanceof Error) {
        //TODO: show error message in snackbar
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
