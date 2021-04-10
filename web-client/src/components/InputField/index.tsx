import React, { FC } from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
const InputField: FC<any> = (props: any) => {
  const {
    label,
    type = "text",
    control,
    name,
    disabled,
    errors,
    touched,
  } = props;
  const isError = errors[name]?.message && touched[name];
  return (
    <>
      <Controller
        render={({ field }) => (
          <TextField
            {...props}
            variant="outlined"
            margin="normal"
            fullWidth
            id={name}
            {...field}
            error={isError}
            helperText={errors[name]?.message}
            label={label && label}
            type={type}
            disabled={disabled}
          />
        )}
        name={name}
        control={control}
      />
    </>
  );
};

export default InputField;
