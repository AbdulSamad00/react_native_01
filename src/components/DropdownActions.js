import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, } from 'react-native';
import React, { useState } from 'react';
import { actions, saveMenu } from '../config/pickerElements';
import { Dropdown, GroupDropdown } from 'sharingan-rn-modal-dropdown';
import { colors, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Colors from '../config/colors'
const width = Dimensions.get("window").width

export default function ({
  value,
  onChange,

}) {
  const isTablet = width >= 800
  const [isVisible, setIsVisible] = useState(false);
  const [val, setVal] = useState(value);

// console.log(val)
  const findLabel = (o) => {
    let object = actions.filter(e => e.value == o)[0]
    let label = object?.label
    // console.log('label',object)
    // let label='value'

    return label
  }
  return (


    <View
      style={{
        marginBottom: 10,
        marginTop: 15,
        // height: 45,
        width: isTablet ? 350 : "100%",
        marginLeft: isTablet ? 50 : 0,
      }}
    >
      {Platform.OS=="ios"?
      <Dropdown
        textInputPlaceholder={"Actions"}
        data={actions}
        value={val}
        onChange={onChange}
        enableAvatar
        avatarSize={25}
        mode="flat"

      />
      :
      <>
        <TouchableOpacity style={styles.header} onPress={() => setIsVisible(!isVisible)}>
          <Text>{val=='actions' ? "Actions" :findLabel(val) }</Text>
          <Icon name="caret-down-outline" type={"ionicon"} size={18} />
        </TouchableOpacity>

        <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} backdropOpacity={.1} backdropColor={"transparent"} animationIn={"fadeIn"} animationOut={"fadeOut"} >
          <View style={{ position: "absolute", height: 200, backgroundColor: "#fff", top: 128, width: '34%', right: 0, elevation: 1 }}>
            <ScrollView>

              {actions.map((item) => (
                <TouchableOpacity onPress={() => { onChange(item.value); setIsVisible(false); setVal(item.value) }} style={styles.row}>
                  <Image style={{ width: 20, height: 20, marginRight: 7 }} source={item.avatarSource} />
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

        </Modal>
      </>
      }


    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey5
  },
  container: {
    // flex:1,
    position: "absolute",
    borderWidth: 1,
    borderColor: colors.grey5,
    backgroundColor: 'red',
    // overflow:"hidden",
    top: '20%',
    width: "36%",
    // height: 300,
    // zIndex:900,
    right: -10,
    alignSelf: "flex-end"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey3,
    paddingHorizontal: 13,
    height: 63,
    backgroundColor: Colors.GREY.whiteish,
    width: "100%"
  }
})