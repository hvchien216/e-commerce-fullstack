import React, { FC } from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";

export interface IOptionRadioButton {
  value: string | number;
  disable?: boolean;
  label: string;
}

const RadioBoxGroupField: FC<any> = (props: any) => {
  const {
    label,
    type = "text",
    control,
    name,
    disabled,
    errors,
    touched,
    options,
  } = props;
  const isError = errors[name]?.message && touched[name];
  return (
    <>
      <Controller
        render={({ field }) => (
          <>
            <FormControl component="fieldset" error={isError}>
              <FormLabel component="legend">{label}</FormLabel>
              <RadioGroup {...field} {...props}>
                {options.map((o: IOptionRadioButton) => {
                  return (
                    <FormControlLabel
                      key={o.value}
                      value={o.value}
                      disabled={o.disable}
                      control={<Radio />}
                      label={o.label}
                    />
                  );
                })}
              </RadioGroup>
              <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
          </>
        )}
        name={name}
        control={control}
      />
    </>
  );
};

export default RadioBoxGroupField;
