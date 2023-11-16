/* eslint-disable react/prop-types */
import CustomInputLabel from "@components/auth/CustomInputLabel";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

function TextAreaField({
  name,
  label,
  control,
  direction = "vertical",
  required = false,
  gridTemplateColumns = { lg: "40% 60%", md: "40% 60%", xs: "auto" },
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        const { errors } = formState;
        return (
          <Box
            display={direction === "vertical" ? "flex" : "grid"}
            gridTemplateColumns={gridTemplateColumns}
            flexDirection="column"
            alignItems="center"
          >
            {label && <CustomInputLabel label={label} required={required} />}
            <TextField
              {...props}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              autoComplete="fullName"
              type="text"
              rows={4}
              multiline
              // label={label}
              onChange={(data) => field.onChange(data)}
              value={field.value}
              error={Boolean(errors[name])}
              helperText={Boolean(errors[name]) && errors[name].message}
            />
          </Box>
        );
      }}
    />
  );
}

export default TextAreaField;
