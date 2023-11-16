import {
  Box,
  Typography
} from "@mui/material";
import { FC } from "react";

type CustomInputLabelProps = {
  label?: string;
  required: boolean;
  variant?: any;
};

const CustomInputLabel: FC<CustomInputLabelProps> = ({
  label,
  required,
  variant = "subtitle1",
  ...other
}) => {
  return (
    <Typography
      {...other}
      variant={variant}
      sx={{
        display: "flex",
        mb: 0.5,
        width: "100%",
      }}
    >
      {label} {required && <Box sx={{ color: "red" }}>{"*"}</Box>}
    </Typography>
  );
};

export default CustomInputLabel;
