import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { Button, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import {
  deleteListkanban,
  postListkanban,
  updateListkanban,
} from "../../api/listkanbans";
import AuthContext from "../../auth/context";
import AppTextArea from "../../components/forms/AppTextArea";
import AppTextInput from "../../components/forms/AppTextInput";
import { fetchListkanbans } from "../../store/listkanbans";
import { makelistKanbanNo } from "../../utils";
import ColorPicker from "./ColorPicker";
import { statusOptions } from "./initialAndDropdownValues";

const AddOrUpdateListKanban = ({
  visible,
  setVisible,
  selectedListkanban = {},
}) => {
  const dispatch = useDispatch();
  const { kanbans, selectedKanban } = useSelector((state) => state.kanbans);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const { user } = useContext(AuthContext);
  const { userID, listKanbanNo, status, name, color, _id } = selectedListkanban;

  const { handleChange, handleSubmit, setFieldValue, resetForm, values } =
    useFormik({
      initialValues: {
        userID: userID ? userID._id : user._id,
        listKanbanNo: listKanbanNo ? listKanbanNo : makelistKanbanNo(),
        kanbanNo: selectedKanban ? selectedKanban._id : "",
        name: name ? name : "",
        status: status ? status : "active",
        color: color ? color : "#aaa",
      },
      onSubmit: async (values) => {
        if (_id) {
          const { ok } = await updateListkanban(_id, values);
          if (ok) {
            hideModal();
            dispatch(fetchListkanbans(selectedKanban._id));
          }
        } else {
          const { ok } = await postListkanban(values);
          if (ok) {
            hideModal();
            dispatch(fetchListkanbans(selectedKanban._id));
          }
        }
      },
    });

  const hideModal = () => {
    resetForm();
    setVisible(false);
  };
  const getKanbans = () => {
    return kanbans.map((kanban) => ({
      id: kanban._id,
      label: kanban.name,
      value: kanban._id,
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
          <Text style={{ marginBottom: 5 }}>Name of listkanban</Text>
          <AppTextInput
            placeholder="Enter name,title or subject for listkanban"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["name"]}
            onChangeText={handleChange("name")}
          />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Kanban</Text>
          <Dropdown
            textInputPlaceholder="Select Kanban"
            data={getKanbans()}
            value={values["kanbanNo"]}
            onChange={handleChange("kanbanNo")}
            mode="outlined"
            disabled
          />
        </View>
        <View
          style={{
            marginBottom: 10,
            flex: 1,
          }}
        >
          <Text>Color</Text>
          <TouchableOpacity
            onPress={() => {
              setOpenColorPicker(true);
            }}
            style={{
              height: 40,
              backgroundColor: values["color"] ? values["color"] : "#ddd",
            }}
          >
            <ColorPicker
              visible={openColorPicker}
              setVisible={setOpenColorPicker}
              setColor={setFieldValue}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Participants</Text>
          <AppTextInput
            placeholder="Participants"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            // value={values["participants"]}
            // onChangeText={handleChange("participants")}
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
            // value={values["note"]}
            // onChangeText={handleChange("note")}
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
      <View style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
        <Button
          style={[{ flex: 2 }, _id && { marginRight: 10 }]}
          mode="contained"
          theme={{
            colors: {
              primary: "#00B7DD",
            },
          }}
          onPress={handleSubmit}
        >
          Submit
        </Button>
        {_id && (
          <Button
            mode="contained"
            style={{ flex: 1 }}
            theme={{
              colors: {
                primary: "#d00",
              },
            }}
            onPress={async () => {
              const response = await deleteListkanban(_id);
              if (response.ok) {
                hideModal();
                dispatch(fetchListkanbans(selectedKanban._id));
              }
            }}
          >
            Delete
          </Button>
        )}
      </View>
    </Modal>
  );
};

export default AddOrUpdateListKanban;

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
