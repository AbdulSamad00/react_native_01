import { useFormik } from "formik";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import { deleteCard, postCard, updateCard } from "../../api/cards";
import AuthContext from "../../auth/context";
import AppTextArea from "../../components/forms/AppTextArea";
import AppTextInput from "../../components/forms/AppTextInput";
import { fetchListkanbans } from "../../store/listkanbans";
import { makeCardNo } from "../../utils";
import {
  categoryOptions,
  priorityOptions,
  statusOptions,
} from "./initialAndDropdownValues";

const AddOrUpdateCard = ({
  visible,
  setVisible,
  selectedCard = {},
  throughAddCard = false,
}) => {
  const dispatch = useDispatch();
  const { kanbans, selectedKanban } = useSelector((state) => state.kanbans);
  const { listkanbans } = useSelector((state) => state.listkanbans);
  const { users } = useSelector((state) => state.users);
  const { user } = useContext(AuthContext);

  const {
    userID,
    kanbanNo,
    listKanbanNo,
    cardNo,
    name,
    narrative,
    category,
    priority,
    deadline,
    field,
    tags,
    reference,
    assignedTo,
    share,
    note,
    createdOn,
    _id,
    status,
  } = selectedCard;

  const getAssignedTo = () => {
    if (!assignedTo) return [];
    const assignedToUsers = users.filter((user) =>
      assignedTo.includes(user._id)
    );
    return assignedToUsers.map((user) => user._id);
  };

  const { handleChange, handleSubmit, setFieldValue, resetForm, values } =
    useFormik({
      initialValues: {
        userID: userID ? userID : user._id,
        listKanbanNo: listKanbanNo ? listKanbanNo : "",
        kanbanNo: kanbanNo ? kanbanNo : "",
        cardNo: cardNo ? cardNo : makeCardNo(),
        cardname: name ? name : "",
        narrative: narrative ? narrative : "",
        category: category ? category : "",
        priority: priority ? priority : "",
        deadline: deadline ? deadline : new Date(),
        documentNo: "",
        field: field ? field : "",
        tags: tags ? tags : "",
        reference: reference ? reference : "",
        sharingLink: share ? share.link : "",
        assignedTo: assignedTo ? getAssignedTo() : [],
        sharedTo: share ? share.sharedTo : "",
        sharedTill: share ? share.sharedTill : "",
        note: note ? note : "",
        createdOn: createdOn ? createdOn : new Date(),
        status: status ? status : "active",
      },
      onSubmit: async (values) => {
        if (_id) {
          const { ok } = await updateCard(_id, values);
          if (ok) {
            hideModal();
            dispatch(fetchListkanbans(selectedKanban._id));
          }
        } else {
          const { ok } = await postCard(values);
          if (ok) {
            hideModal();
            dispatch(fetchListkanbans(selectedKanban._id));
          }
        }
      },
    });

  const getKanbans = () => {
    return kanbans.map((kanban) => ({
      id: kanban._id,
      label: kanban.name,
      value: kanban._id,
    }));
  };

  const getListKanbans = (kanbanNo) => {
    return listkanbans
      .filter((listkanban) => listkanban.kanbanNo._id === kanbanNo)
      .map((listkanban) => ({
        id: listkanban._id,
        label: listkanban.name,
        value: listkanban._id,
      }));
  };
  const getUsers = () => {
    return users.map((user) => ({
      id: user._id,
      label: `${user.contactName.first} ${user.contactName.last}`,
      value: user._id,
    }));
  };

  const hideModal = () => {
    resetForm();
    setVisible(false);
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
        <Text>Add Card</Text>
        <IconButton onPress={hideModal} icon="close" />
      </View>
      {/* inputs */}
      <ScrollView style={styles.inputsContainer}>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Kanban No</Text>
          <Dropdown
            textInputPlaceholder="Select Kanban"
            data={getKanbans()}
            value={values["kanbanNo"]}
            onChange={handleChange("kanbanNo")}
            mode="outlined"
            disabled={throughAddCard && true}
          />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Listkanban No</Text>
          <Dropdown
            textInputPlaceholder="Select Listkanban"
            data={getListKanbans(values["kanbanNo"])}
            value={values["listKanbanNo"]}
            onChange={handleChange("listKanbanNo")}
            mode="outlined"
            disabled={throughAddCard && true}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Name of card </Text>
          <AppTextInput
            placeholder="Enter name,title or subject for card"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["cardname"]}
            onChangeText={handleChange("cardname")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Narrative </Text>
          <AppTextArea
            placeholder="Tell your story issues"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            numberOfLines={5}
            value={values["narrative"]}
            onChangeText={handleChange("narrative")}
          />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Category</Text>
          <Dropdown
            textInputPlaceholder="Select Category"
            data={categoryOptions}
            value={values["category"]}
            onChange={handleChange("category")}
            mode="outlined"
          />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Priority </Text>
          <Dropdown
            textInputPlaceholder="Select Priority"
            data={priorityOptions}
            value={values["priority"]}
            onChange={handleChange("priority")}
            mode="outlined"
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Document No </Text>
          <AppTextInput
            placeholder="Enter Document Number"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["documentNo"]}
            onChangeText={handleChange("documentNo")}
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
          <Text style={{ marginBottom: 5 }}>References </Text>
          <AppTextInput
            placeholder="Enter References"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["reference"]}
            onChangeText={handleChange("reference")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Sharing link</Text>
          <AppTextInput
            placeholder="Enter Sharing link"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["sharingLink"]}
            onChangeText={handleChange("sharingLink")}
          />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Assigned To </Text>
          <MultiselectDropdown
            emptySelectionText="Select Assigned To:"
            selectedItemsText="Selected Assigned To:"
            data={getUsers()}
            value={values["assignedTo"]}
            onChange={(value) => {
              setFieldValue("assignedTo", value);
            }}
            mode="flat"
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Shared To</Text>
          <AppTextInput
            placeholder="Enter shared card"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["sharedTo"]}
            onChangeText={handleChange("sharedTo")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Shared Till</Text>
          <AppTextInput
            placeholder="Enter shared till"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            value={values["sharedTill"]}
            onChangeText={handleChange("sharedTill")}
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
              const response = await deleteCard(_id);
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

export default AddOrUpdateCard;

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
