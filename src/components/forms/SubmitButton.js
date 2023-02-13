import React from "react";
import { useFormikContext } from "formik";
import { Appbtn } from "./../Appbtn";

function SubmitButton({ txt, disabled }) {
  const { handleSubmit } = useFormikContext();
  return <Appbtn disabled={disabled} onPress={handleSubmit} txt={txt} />;
}

export default SubmitButton;
