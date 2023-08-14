import React from "react";
import { Field, useFormikContext } from "formik";
import TextField from "./styled/TextField";
import SelectField from "./styled/SelectField";
import ErrorMessage from "./styled/ErrorMessage";
import { Box } from "../styled";

const FormField = ({ name, placeholder, options, type }) => {
  const { errors, touched } = useFormikContext();

  const renderInput = fieldProps => {
    if (type === "date") {
      return (
        <input
          type="date"
          id={name}
          name={name}
          value={fieldProps.field.value}
          onChange={fieldProps.field.onChange}
          onBlur={fieldProps.field.onBlur}
          className="custom-date-input"
        />
      );
    }
    if (options) {
      return (
        <SelectField
          data-cy={`${name}Input`}
          fontSize="lg"
          placeholder={placeholder}
          fluid
          error={fieldProps.meta.error && fieldProps.meta.touched}
          {...fieldProps.field}
        >
          <option value="" label={placeholder} disabled />
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      );
    }
    return (
      <TextField
        data-cy={`${name}Input`}
        fontSize="lg"
        placeholder={placeholder}
        fluid
        error={fieldProps.meta.error && fieldProps.meta.touched}
        {...fieldProps.field}
      />
    );
  };

  return (
    <Box marginBottom="md">
      <Field name={name}>{fieldProps => renderInput(fieldProps)}</Field>
      {errors[name] && touched[name] && (
        <ErrorMessage data-cy={`${name}ErrorMessage`}>
          {errors[name]}
        </ErrorMessage>
      )}
    </Box>
  );
};

export default FormField;
