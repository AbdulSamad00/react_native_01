import React from "react";
import { useFormikContext } from "formik";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import ErrorMessage from "./ErrorMessage";

const FormPicker = ({ data, name, textInputPlaceholder, enableAvatar,style, onGeTValue = () => {}, ...otherProps }) => {
  const { errors, handleChange, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      {/* <Picker
                items={items}
                numberOfColumns={numberOfColumns}
                icon={icon}
                onItemSelect={(item) => setFieldValue(name, item)}
                placeholder={placeholder}
                PickerItemComponent={PickerItemComponent}
                selectedItem={values[name]}
                width={width}
                {...otherProps}
            /> */}

      <Dropdown
        //textInputPlaceholder="Select current treatment"
        textInputPlaceholder={textInputPlaceholder}
        data={data}
        value={ values[name] }
        //onChange={handleChange(name)}
        onChange={ value => {
          setFieldValue(name, value)
          onGeTValue(value)
        }}
        avatarSize={35}
        //mode="flat"
        // activityIndicatorColor={'black'}
        textInputStyle={style}
        enableAvatar={enableAvatar}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormPicker;
