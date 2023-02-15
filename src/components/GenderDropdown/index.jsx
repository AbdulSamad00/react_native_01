import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Menu, Text, Provider } from "react-native-paper";
import { useFormikContext } from "formik";
import ErrorMessage from "../forms/ErrorMessage";

export default function GenderDropdown({ name }) {
  const [state, setState] = useState(false);

  const { errors, setFieldValue, touched, values } = useFormikContext();

  const onSelect = (gender) => {
    setFieldValue(name, gender);
    setState(false);
  };
  return (
    <Provider>
      <Menu
        style={{ zIndex: 12 }}
        anchor={
          <TouchableOpacity
            onPress={() => setState(true)}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor:
                `${values[name]}`.toLowerCase() === "male"
                  ? "#007aff"
                  : `${values[name]}`.toLowerCase() === "female"
                  ? "#ff8888"
                  : "#aaa",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {values[name] ? values[name] : "Selected Gender"}
            </Text>
          </TouchableOpacity>
        }
        onDismiss={() => setState(false)}
        visible={state}
      >
        <Menu.Item title="Male" onPress={() => onSelect("Male")} />
        <Menu.Item title="Female" onPress={() => onSelect("Female")} />
        <Menu.Item title="Transgender" onPress={() => onSelect("Transgender")}
        />
      </Menu>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Provider>
  );
}
