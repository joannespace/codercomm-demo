import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  useFormControl,
} from "@mui/material";
import { Controller } from "react-hook-form";

function FMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormControl();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) =>
          field.value.includes(option)
            ? field.value.filter((value) => value !== option)
            : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checed={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

export default FMultiCheckbox;
