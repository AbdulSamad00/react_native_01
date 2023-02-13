import React from "react";
import { Formik } from "formik";

function Form({
  initialValues,
  onSubmit,
  validationSchema,
  enableReinitialize,
  children,
  ...otherProps
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
      {...otherProps}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default Form;
