import React, { useCallback } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { alpha, Box, Stack } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { editPost } from "./postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

function PostEditForm({ handleClose, postId, editContent, editImage }) {
  const defaultValues = {
    content: editContent,
    image: editImage,
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    const { content, image } = data;
    dispatch(editPost({ postId, content, image }));
    handleClose();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FTextField
          name="content"
          multiline
          fullWidth
          rows={4}
          placeholder="Share what you are thinking here"
          sx={{
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: alpha("#919EAB", 0.32),
            },
          }}
        />

        <FUploadImage
          defaultValue={editImage}
          name="image"
          accept="image/*"
          maxSize={3145728}
          onDrop={handleDrop}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <LoadingButton
            type="submit"
            size="small"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            POST
          </LoadingButton>
        </Box>
      </Stack>
    </FormProvider>
    // </Card>
  );
}

export default PostEditForm;
