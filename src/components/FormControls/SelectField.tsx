import CustomInputLabel from "@components/auth/CustomInputLabel";
import { MenuItem, FormControl, Select, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectField = ({
  name,
  label,
  control,
  selectData,
  isCustomData,
  disabled = false,
  onChange,
  required,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        const { errors } = formState;
        return (
          <FormControl
            fullWidth
            variant="outlined"
            error={errors[name] ? true : false}
          >
            <CustomInputLabel required={required} label={label} />
            <Select
              value={field.value}
              onChange={(e) => {
                if (onChange) return onChange({ e, field });
                field.onChange(e);
              }}
              disabled={disabled}
            >
              {isCustomData
                ? selectData.map((item, index) => (
                    <MenuItem key={index} value={item._selectKey}>
                      {item._selectName}
                    </MenuItem>
                  ))
                : selectData.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
            </Select>
            <FormHelperText error={errors[name]}>
              {errors[name] && errors[name].message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default SelectField;
