import CustomInputLabel from "@components/auth/CustomInputLabel";
import { TextField, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

function PriceInput({
  name,
  label,
  control,
  min = 5000,
  max = 100000000 }) {
  // const handleBlur = () => {
  //   if (ref.current?.children) {
  //     Array.from(ref.current?.children).forEach((item) => {
  //       if (item) {
  //         item.classList.remove("Mui-focused");
  //         Array.from(item.getElementsByTagName("input")).forEach((input) => {
  //           input.blur();
  //         });
  //       }
  //     });
  //   }
  // };
  // if (!isEditing) handleBlur();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, formState }) => {
        const { errors } = formState;
        return (
          <FormControl fullWidth error={errors[name] ? true : false}>
            <CustomInputLabel required={require} label={label} />
            {/* <NumericFormat
              getInputRef={ref}
              {...other}
              {...field}
              suffix="đ"
              customInput={TextField}
              // InputProps={{
              //   startAdornment: adornmentDisabled ? null : (
              //     <InputAdornment position="end">đ</InputAdornment>
              //   ),
              // }}
              label={labelDisabled ? null : label}
              variant="outlined"
              InputLabelProps={{ shrink: labelDisabled ? false : true }}
              decimalScale={decimalScale}
              allowNegative={allowNegative}
              allowLeadingZeros={false}
              allowedDecimalSeparators={[","]}
              thousandSeparator
              value={field.value}
              onChange={field.onChange}
            
              // onBlur={(data) => {
              //   if (onBlur) {
              //     onBlur();
              //   }
              //   if (!data.target.value && data.target.value !== 0) {
              //     field.onChange(0);
              //   }
              // }}
              // onInput={(e) => {
              //   if (onInput) return onInput(e);
              //   if (!allowNegative) {
              //     e.target.value = e.target.value === "" ? "0" : e.target.value;
              //   }
              // }}
             
            /> */}
            <NumericFormat
              value={field.value}
              onChange={field.onChange}
              suffix="đ"
              customInput={TextField}
              thousandSeparator
              max={max}
              min={min}
              error={Boolean(errors[name])}
              helperText={Boolean(errors[name]) && errors[name].message}
              isAllowed={({ value }) => {
                return value < max;
              }}
            />
          </FormControl>
        );
      }}
    />
  );
}

export default PriceInput;
