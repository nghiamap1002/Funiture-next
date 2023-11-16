import { Box, InputLabel } from "@mui/material";
import { styled } from "@mui/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { FC, useState } from "react";
import { Controller } from "react-hook-form";

const CustomDatePicker = styled(DatePicker)((bgcolor: any) => ({
  "& .MuiInputBase-root ": {
    // borderRadius: "0.8rem",
    backgroundColor: bgcolor,
  },
}));

type DateTimeFieldProps = {
  name: string;
  label?: string;
  minDate?: string;
  maxDate?: string;
  clearable?: boolean;
  control: any;
  inputFormat?: any;
  views?: any[];
  required?: boolean;
  labelInput?: boolean;
  gridTemplateColumns?: any;
  direction?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
};

const DateTimeField: FC<DateTimeFieldProps> = ({
  name,
  label,
  labelInput = false,
  clearable = false,
  control,
  minDate,
  maxDate,
  inputFormat = "DD/MM/YYYY",
  views = ["day", "month", "year"],
  direction = "verical",
  gridTemplateColumns = { lg: "40% 60%", md: "40% 60%", xs: "auto" },
  required = false,
  disableFuture = false,
  disablePast = false,
  ...other
}) => {
  const [open, setOpen] = useState(false);

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
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <CustomDatePicker
                {...other}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                views={views}
                label={labelInput ? label : null}
                disableFuture={disableFuture}
                disablePast={disablePast}
                closeOnSelect
                format={inputFormat}
                defaultCalendarMonth={minDate || null}
                value={(field.value && moment(field.value)) || null}
                onChange={(data: any) => field.onChange(data)}
                slotProps={{
                  textField: {
                    helperText:
                      Boolean(errors[name]) &&
                      (errors[name]?.message as string),
                  },
                  field: {
                    clearable: clearable,
                    onClear: () => (field.value = ""),
                  },
                }}
                minDate={minDate || null}
                maxDate={maxDate || null}
              />
            </LocalizationProvider>
          </Box>
        );
      }}
    />
  );
};

export default DateTimeField;
