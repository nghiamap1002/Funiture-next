import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

type CheckboxFieldProps = {
  name: string;
  label: string;
  control: any;
  rules: any;
  labelPlacement: "top" | "bottom" | "end" | "start" | undefined;
};

const CheckboxField: FC<CheckboxFieldProps> = ({
  name,
  label,
  control,
  rules,
  labelPlacement = "end",
  ...other
}) => {
  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      render={({ field, formState }) => {
        return (
          <>
            <FormControlLabel
              {...other}
              checked={field.value}
              onChange={(data) => field.onChange(data)}
              control={<Checkbox />}
              label={label}
              labelPlacement={labelPlacement}
            />
            <FormHelperText
              id="checkbox-helper-text"
              error={formState.errors[name] ? true : false}
            >
              {formState.errors[name]?.message as string}
            </FormHelperText>
          </>
        );
      }}
    />
  );
};

export default CheckboxField;
