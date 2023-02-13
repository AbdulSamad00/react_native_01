import { useFormik } from "formik";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { postKanban, updateKanban } from "../../api/kanbans";
import AuthContext from "../../auth/context";
import AppTextArea from "../../components/forms/AppTextArea";
import AppTextInput from "../../components/forms/AppTextInput";
import { fetchKanbans } from "../../store/kanbans";
import { makeKanbanNo } from "../../utils";
import { statusOptions } from "./initialAndDropdownValues";

const AddOrUpdateKanban = ({ visible, setVisible, selectedKanban }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const {
    userID,
    businessNo,
    kanbanNo,
    name,
    department,
    subDepartment,
    locations,
    description,
    field,
    tags,
    participants,
    note,
    status,
    _id,
  } = selectedKanban;

  const { handleChange, handleSubmit, setFieldValue, resetForm, values } =
    useFormik({
      initialValues: {
        userID: userID ? userID : user._id,
        businessNo: businessNo ? businessNo : user._id,
        kanbanNo: kanbanNo ? kanbanNo : makeKanbanNo(),
        name: name ? name : "",
        department: department ? department : "",
        subDepartment: subDepartment ? subDepartment : "",
        locations: locations ? locations : "",
        description: description ? description : "",
        field: field ? field : "",
        tags: tags ? tags : "",
        participants: participants ? `${participants}` : "",
        note: note ? note : "",
        status: status ? status : "active",
      },
      onSubmit: async (values) => {
        if (_id) {
          const { ok } = await updateKanban(_id, values);
          if (ok) {
            hideModal();
            dispatch(fetchKanbans());
          }
        } else {
          const { ok } = await postKanban(values);
          if (ok) {
            hideModal();
            dispatch(fetchKanbans());
          }
        }
      },
    });

  const hideModal = () => {
    resetForm();
    setVisible(false);
  };

  const getUsers = () => {
    return users.map((user) => ({
      id: user._id,
      label: `${user.contactName.first} ${user.contactName.last}`,
      value: user._id,
    }));
  };

  return (
    <Modal isVisible={visible} onModalHide={hideModal} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text>Add Kanban</Text>
        <IconButton onPress={hideModal} icon="close" />
      </View>
      {/* inputs */}
      <ScrollView style={styles.inputsContainer}>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Name of kanban</Text>
          <AppTextInput
            placeholder="Enter name,title or subject for kanban"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["name"]}
            onChangeText={handleChange("name")}
          />
        </View>
        {/* <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Participants </Text>
          <MultiselectDropdown
            emptySelectionText="Select Participants:"
            selectedItemsText="Selected Participants:"
            data={getUsers()}
            value={values["participants"]}
            onChange={(value) => {
              setFieldValue("participants", value);
            }}
            mode="flat"
          />
        </View> */}
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Department</Text>
          <AppTextInput
            placeholder="Enter Department"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["department"]}
            onChangeText={handleChange("department")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Sub-Department</Text>
          <AppTextInput
            placeholder="Enter Sub-Department"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["subDepartment"]}
            onChangeText={handleChange("subDepartment")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Locations</Text>
          <AppTextInput
            placeholder="Enter Locations"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["locations"]}
            onChangeText={handleChange("locations")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Description </Text>
          <AppTextArea
            placeholder="Enter Description"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            numberOfLines={6}
            value={values["description"]}
            onChangeText={handleChange("description")}
          />
        </View>

        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>field </Text>
          <AppTextInput
            placeholder="Enter field"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["field"]}
            onChangeText={handleChange("field")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Tags </Text>
          <AppTextInput
            placeholder="Enter Tags"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["tags"]}
            onChangeText={handleChange("tags")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Note </Text>
          <AppTextArea
            placeholder="Enter note"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            numberOfLines={6}
            value={values["note"]}
            onChangeText={handleChange("note")}
          />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Status</Text>
          <Dropdown
            textInputPlaceholder="Select Status"
            data={statusOptions}
            value={values["status"]}
            onChange={handleChange("status")}
            mode="outlined"
          />
        </View>
      </ScrollView>
      <View style={{ padding: 5 }}>
        <Button
          mode="contained"
          loading
          theme={{
            colors: {
              primary: "#00B7DD",
            },
          }}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </View>
    </Modal>
  );
};

export default AddOrUpdateKanban;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  inputsContainer: {
    marginHorizontal: 10,
    maxHeight: "90%",
  },
});
