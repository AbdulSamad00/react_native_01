import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { IconButton, Menu, Text } from "react-native-paper";
import countries from "../../data/countries.json";

/** Component for country selection
 * @param {{onSelect: (country: any) => void}} props
 */
export default function CountryDropdown(props) {
  const [state, setState] = useState({ vis: false, country: countries.AF });
  const onSelect = (k) => {
    const country = countries[k];
    country["code"] = k;
    setState({ vis: false, country });
    props.onSelect(country);
  };
  return (
    <Menu
      anchor={
        <TouchableOpacity
          onPress={() => setState({ ...state, vis: true })}
          style={{
            padding: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#aaa",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: state.country.flag, width: 18, height: 18 }}
              style={{ margin: 4, borderRadius: 2 }}
            />
            <Text style={{ fontWeight: "bold" }}>
              {state.country.name.common}
            </Text>
            <IconButton icon="chevron-down" style={{ margin: 0, padding: 0 }} />
          </View>
        </TouchableOpacity>
      }
      onDismiss={() => setState({ ...state, vis: false })}
      visible={state.vis}
    >
      <ScrollView style={{ maxHeight: 150 }}>
        {Object.keys(countries).map((k) => (
          <Menu.Item
            key={k}
            icon={() => (
              <Image
                source={{ uri: countries[k].flag, width: 24, height: 24 }}
                style={{ borderRadius: 4 }}
              />
            )}
            title={countries[k].name.common}
            onPress={() => onSelect(k)}
          />
        ))}
      </ScrollView>
    </Menu>
  );
}
