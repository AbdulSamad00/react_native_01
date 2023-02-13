import React from "react";
import { useFormikContext } from "formik";
import DatePicker from "./../DatePicker";

import ErrorMessage from "./ErrorMessage";

const FormDatePicker = ({name, ...otherProps }) => {
  const { errors, setFieldValue, touched } = useFormikContext();
  
 const onDateChange = (value) => {
   setFieldValue(name, value.toISOString());
 } 
 
  return (
    <>
       <DatePicker 
        onDateChange={onDateChange}
        {...otherProps}
        />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormDatePicker;
