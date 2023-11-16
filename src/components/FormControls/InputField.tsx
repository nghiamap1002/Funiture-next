/* eslint-disable react/prop-types */
import { useDisclosure } from "@hooks";
import {
  Box,
  IconButton,
  InputAdornment,
  // InputLabel,
  TextField,
  styled,
} from "@mui/material";
import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import CustomInputLabel from "../CustomInputLabel";

const PREFIX = "input-field";
const classes = {
  root: `${PREFIX}-root`,
  iconButton: `${PREFIX}-iconbutton`,
};

const Root = styled("div")(() => ({
  [`&.${classes.root}`]: {
    width: "100%",
  },
  [`& .${classes.iconButton}`]: {
    cursor: "pointer",
    "&__icon": {
      color: "rgb(99, 115, 129)",
    },
  },
}));

const CustomTextField: any = styled(TextField)(
  ({ controlbutton, bgcolor }: any) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: controlbutton === "true" && "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    "& .MuiOutlinedInput-root": {
      // borderRadius: "0.8rem",
      backgroundColor: bgcolor,
    },
  })
);

type InputFieldProps = {
  type: string;
  disabled: boolean;
  name: string;
  label: string;
  control: any;
  placeholder: string;
  onChange: ({ value }: any) => void;
  onInput: any;
  labelDisabled: any;
  inputProps: any;
  InputProps: any;
  removeControlButton: boolean;
  maxLength: number;
  startAdornmentIcon: any;
  startAdornmentIconFocus: any;
  endAdornmentIcon: any;
  endAdornmentIconFocus: any;
  required: boolean;
  showPassword: boolean;
  onFocus: any;
  onBlur: any;
  direction: any;
  gridTemplateColumns: any;
  bgColor: any;
};

const InputField: FC<InputFieldProps> = ({
  type = "text",
  disabled = false,
  name,
  label,
  control,
  placeholder,
  onChange,
  onInput,
  labelDisabled,
  inputProps = {},
  InputProps = {},
  removeControlButton = false,
  maxLength = 99999999,
  startAdornmentIcon,
  startAdornmentIconFocus,
  endAdornmentIcon,
  endAdornmentIconFocus,
  required,
  showPassword = false,
  onFocus,
  onBlur,
  direction = "vertical",
  gridTemplateColumns = { lg: "40% 60%", md: "40% 60%", xs: "auto" },
  ...other
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [focus, setFocus] = useState(false);
  const renderEndAdornment = () =>
    endAdornmentIcon || showPassword ? (
      <InputAdornment position="end" onClick={onToggle}>
        {type === "password" ? (
          <IconButton>{/* eye icon mui */}</IconButton>
        ) : (
          (focus && endAdornmentIconFocus) || endAdornmentIcon
        )}
      </InputAdornment>
    ) : (
      InputProps.endAdornment
    );

  const renderStartAdornment = () =>
    startAdornmentIcon ? (
      <InputAdornment position="start">
        {(focus && startAdornmentIconFocus) || startAdornmentIcon}
      </InputAdornment>
    ) : (
      InputProps.endAdornment
    );

  return (
    <Root className={classes.root}>
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
              <CustomTextField
                // bgcolor={bgColor}
                {...other}
                onFocus={(e: any) => {
                  if (onFocus) return onFocus(e);
                  setFocus(true);
                }}
                onBlur={(e: any) => {
                  if (onBlur) return onBlur(e);
                  setFocus(false);
                }}
                controlbutton={removeControlButton.toString()}
                value={field.value}
                required={required}
                fullWidth
                disabled={disabled}
                variant="outlined"
                InputLabelProps={{ shrink: labelDisabled ? false : true }}
                type={isOpen ? "text" : type}
                // label={labelDisabled ? null : label}
                placeholder={placeholder}
                InputProps={{
                  endAdornment: renderEndAdornment(),
                  startAdornment: renderStartAdornment(),
                  ...InputProps,
                }}
                inputProps={{
                  // pattern: type === 'number' ? '[0-9]*' : '*',
                  ...inputProps,
                }}
                onInput={(e: any) => {
                  if (onInput) return onInput(e);
                }}
                onChange={(e: any) => {
                  const { value } = e.target;
                  if (onChange) return onChange({ e, field });
                  if (value.length > maxLength) return;
                  field.onChange(e);
                  // field.onChange(e)("isEmail");
                }}
                error={Boolean(errors[name])}
                helperText={
                  Boolean(errors[name]) && (errors[name]?.message as string)
                }
              />
            </Box>
          );
        }}
      />
    </Root>
  );
};

export default InputField;
