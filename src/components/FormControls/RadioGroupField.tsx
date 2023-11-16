import {
  Box,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

const RadioGroupField = ({
  name,
  label,
  control,
  rules,
  options = [
    { label: "Nam", value: 1 },
    { label: "Nữ", value: 2 },
    { label: "Khác", value: 3 },
  ],
  direction = "vertical",
  gridTemplateColumns = { lg: "40% 60%", md: "40% 60%", xs: "auto" },
  required = false,
  row = true,
  ...other
}) => {
  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field, formState }) => {
        return (
          <>
            <Box
              display={direction === "vertical" ? "flex" : "grid"}
              gridTemplateColumns={gridTemplateColumns}
              flexDirection="column"
              alignItems="center"
              {...other}
            >
              {label && (
                <InputLabel
                  sx={{
                    fontWeight: 600,
                    color: "black",
                    display: "flex",
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  {label} {required && <Box sx={{ color: "red" }}>{"*"}</Box>}
                </InputLabel>
              )}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={field.value}
                onChange={(data) => field.onChange(data)}
                name="radio-buttons-group"
                row={row}
              >
                {options.map((item) => (
                  <FormControlLabel
                    key={item.label}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
                <FormHelperText error={formState.errors[name] ? true : false}>
                  {formState.errors[name]?.message}
                </FormHelperText>
              </RadioGroup>
            </Box>
          </>
        );
      }}
    />
  );
};

export default RadioGroupField;
