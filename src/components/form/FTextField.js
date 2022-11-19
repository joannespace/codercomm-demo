import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...field}
          {...other}
        />
      )}
    />
  );
}

export default FTextField;
