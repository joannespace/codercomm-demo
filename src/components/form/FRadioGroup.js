import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FRadioGroup({ name, options, getOptionLabel, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        <div>
          <RadioGroup row {...field} {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>;
      }}
    />
  );
}

export default FRadioGroup;
