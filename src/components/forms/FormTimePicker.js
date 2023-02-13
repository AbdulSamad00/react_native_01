import React from "react";
import { useFormikContext } from "formik";
import TimePicker from "./../TimePicker";

import ErrorMessage from "./ErrorMessage";

const FormTimePicker = ({name, ...otherProps }) => {
  const { errors, setFieldValue, touched } = useFormikContext();
  
 const onDateChange = (value) => {
   setFieldValue(name, value.toISOString());
 } 
 
  return (
    <>
       <TimePicker 
        onDateChange={onDateChange}
        {...otherProps}
        />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormTimePicker;
