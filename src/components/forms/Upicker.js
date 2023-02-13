import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useFormikContext } from "formik";
import { Picker } from "@react-native-picker/picker";
import AppTextInput from "./AppTextInput";

import ErrorMessage from "./ErrorMessage";
import calculateBMI, { calculateBMICategory } from "../../utils/bmi/bmiclassification";

const Upicker = ({ options, name,label,placeholder,isTablet,  ...otherProps }) => {
  const { errors, handleChange, setFieldValue, touched, values } = useFormikContext();
 
  return (
    <>
<View
          style={{
            flexDirection: "row",
            justifyContent: isTablet ? null : "space-between",
            alignItems: "center",
            width: isTablet ? "30%" : "100%",
            marginBottom: isTablet ? 0 : 16,
          }}
        >
          <AppTextInput
            label={label}
            placeholder={placeholder}
            value={values[name].value}
            keyboardType="decimal-pad"
            onChangeText={(text) => {
                setFieldValue(name, {
                  ...values[name],
                  value: text,
                });
                if(name === "weight"){
                  if(values["height"].value && values["height"].measure && values["weight"].measure){
                    const bmi = calculateBMI(text, values["height"].value, values["height"].measure, values["weight"].measure).toString();
                    setFieldValue("bmi", bmi);
                    setFieldValue("bmiClassification", calculateBMICategory(bmi).toString())
                  }
                }else{
                  if(values["weight"].value && values["height"].measure && values["weight"].measure){
                    const bmi = calculateBMI(values["weight"].value, text, values["height"].measure, values["weight"].measure).toString();
                    setFieldValue("bmi", bmi);
                    setFieldValue("bmiClassification", calculateBMICategory(bmi).toString())
                  }
                }
              }
            }
            containerStyle={{
              width: isTablet ? 100 : "45%",
              marginHorizontal: 10,
              marginBottom: 0,
            }}
          />
          <View
            style={{
              height: 58,
              width: isTablet ? 100 : "45%",
              borderWidth: 1,
              borderColor: "#aaa",
              borderRadius: 8,
              marginTop: 24,
            }}
          >
      <Picker
        mode="dropdown"
        onValueChange={(value) => {
        setFieldValue(name, {
          ...values[name],
          measure: value,
        });
        if(values[name].measure && values["weight"].value, values["height"].value){
          const bmi = calculateBMI(values["weight"].value, values["height"].value, name === "weight" ? values["height"].measure : value, name === "weight" ? value : values["weight"].measure).toString();
          setFieldValue("bmi", bmi);
          setFieldValue("bmiClassification", calculateBMICategory(bmi).toString())
        }
  }}
  selectedValue={values[name].measure}
>
{
options.map((option) => {
    return (
        <Picker.Item label={option} value={option} />
    )
})
}    


  {/* <Picker.Item label="cm" value="cm" />
  <Picker.Item label="inch" value="inch" /> */}
</Picker>
          </View>
        </View>




</>
 );
};

export default Upicker;
