import React from 'react';
import { useFormikContext } from "formik";

import ErrorMessage from './ErrorMessage';
import ImageInput from '../ImageInput';

function FormSingleImagePicker({name ,readOnly = false, value}) {
    const { errors, setFieldValue, touched, values } = useFormikContext();

    const imageUri = readOnly ? value : values[name];
    const onChangeImage = uri => {
        setFieldValue(name,uri);
      }
  

    return (
        <>
  
        <ImageInput 
             imageUri={imageUri}
             onChangeImage={onChangeImage}
        />
       <ErrorMessage error={errors[name]} visible={touched[name]} />
       </>
    );
}

export default FormSingleImagePicker;