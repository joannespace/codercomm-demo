import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FSelect({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        <TextField
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...field}
          {...other}
        >
          {children}
        </TextField>;
      }}
    />
  );
}

export default FSelect;
