import React from "react";
import { useFormikContext } from "formik";
import { AppText } from "./../AppText";
import ErrorMessage from "./ErrorMessage";

function FormField({
  name,
  width,
  style,
  onGetValue,
  onPressUp,
  onPressDown,
  value,
  inputType,
  auto,
  ...otherProps
}) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();

  return (
    <>
      {auto ? (
        <AppText
          onChangeText={(value) => {
            handleChange(name);
            onGetValue && onGetValue(value);
          }}
          onPressUp={() => onPressUp(value)}
          onPressDown={() => onPressDown(value)}
          onBlur={() => setFieldTouched(name)}
          width={width}
          style={style ? style : {}}
          value={value}
          //value={values[name] == null ? "" : values[name]}
          inputType={inputType}
          {...otherProps}
        />
      ) : (
        <AppText
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          width={width}
          style={style ? style : {}}
          value={values[name] == null ? "" : values[name]}
          {...otherProps}
        />
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormField;
