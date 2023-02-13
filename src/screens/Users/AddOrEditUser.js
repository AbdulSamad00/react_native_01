import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button, IconButton } from "react-native-paper";
import * as Yup from "yup";
import getCountries from "../../api/countries";
import getProfiles from "../../api/profiles";
import { deleteUser, postUser, updateUser } from "../../api/users";
import DatePicker from "../../components/DatePicker";
import AppTextInput from "../../components/forms/AppTextInput";
import { AppSingleDropdown } from "../homeo/components/InterviewTab";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address1: Yup.string().required("Required"),
  address2: Yup.string().required("Required"),
  address3: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
  username: Yup.string().min(3).max(30).required("Required"),
  password: Yup.string()
    .matches(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required("Required"),
  profile: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  gender: Yup.string().required("Required"),
});

const AddOrEditUser = ({
  visible,
  setVisible,
  selectedUser = {},
  setSelectedUser,
  setUpdate,
  update,
}) => {
  const [profileOptions, setProfileOptions] = useState([]);
  const [countriesOptions, setCountriesOptions] = useState([]);

  const {
    _id,
    username,
    password,
    email,
    firstName,
    lastName,
    initials,
    profile,
    address1,
    address2,
    address3,
    zip,
    city,
    state,
    country,
    // mobilePhone,
    dateBirth,
    gender,
    prefix,
  } = selectedUser;

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      prefix: prefix ? prefix : "",
      firstName: firstName ? firstName : "",
      lastName: lastName ? lastName : "",
      initials: initials ? initials : "",
      gender: gender ? gender : "",
      username: username ? username : "",
      password: password ? password : "",
      email: email ? email : "",
      profile: profile ? profile : "",
      address1: address1 ? address1 : "",
      address2: address2 ? address2 : "",
      address3: address3 ? address3 : "",
      zip: zip ? zip : "",
      city: city ? city : "",
      state: state ? state : "",
      country: country ? country : "",
      dateBirth: dateBirth ? dateBirth : new Date(),
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Submited Data");

      const filter = { ...values };
      console.log(filter);
      if (_id) {
        const { ok, originalError, data } = await updateUser(_id, filter);
        console.log(ok);
        console.log(data);
        console.log(originalError);
        if (ok) {
          hideModal();
          setUpdate(!update);
        }
      } else {
        const { ok, data, originalError } = await postUser(filter);
        console.log(data);
        console.log(originalError);
        console.log(ok);
        if (ok) {
          hideModal();
          setUpdate(!update);
        }
      }
    },
  });

  const hideModal = () => {
    resetForm();
    setVisible(false);
    setSelectedUser({});
  };

  const getProfilesForSelect = async () => {
    const { ok, data } = await getProfiles.getProfiles();
    if (ok) {
      const filter = data.map((profile) => ({
        label: `${profile.profileName}`,
        value: profile._id,
      }));
      setProfileOptions(filter);
    }
  };
  const getCountriesForSelect = async () => {
    const { ok, data } = await getCountries.getCountries();
    if (ok) {
      const filter = data.map((country) => ({
        label: country.name,
        value: country.name,
      }));
      setCountriesOptions(filter);
    }
  };

  const [isTablet, setIsTablet] = useState(state?.isTablet);

  useEffect(() => {
    getProfilesForSelect();
    getCountriesForSelect();
    setIsTablet(state?.isTablet);
    return () => {};
  }, []);

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
        <Text>{_id ? "Update" : "Add"} Appointment</Text>
        <IconButton onPress={hideModal} icon="close" />
      </View>
      {/* inputs */}
      <ScrollView style={styles.inputsContainer}>
        <AppSingleDropdown
          title="Account Type"
          placeholder="Select Account Type"
          options={profileOptions}
          value={values["profile"]}
          onChange={handleChange("profile")}
          error={errors["profile"]}
        />
        <AppSingleDropdown
          title="Prefix"
          placeholder="Select Prefix"
          options={[
            { value: "mr", label: "Mr." },
            { value: "mrs", label: "Mrs." },
            { value: "mss", label: "Mss." },
            { value: "ms", label: "Ms." },
            { value: "prof", label: "Prof." },
            { value: "dr", label: "Dr." },
          ]}
          value={values["prefix"]}
          onChange={handleChange("prefix")}
        />
        <AppTextInput
          label="First Name"
          placeholder="Enter Firstname"
          value={values["firstName"]}
          onChangeText={handleChange("firstName")}
          touched={touched["firstName"]}
          error={errors["firstName"]}
        />
        <AppTextInput
          label="Initials"
          placeholder="Enter Initials"
          value={values["initials"]}
          onChangeText={handleChange("initials")}
          touched={touched["initials"]}
          error={errors["initials"]}
        />
        <AppTextInput
          label="Last Name"
          placeholder="Enter Last Name"
          value={values["lastName"]}
          onChangeText={handleChange("lastName")}
          touched={touched["lastName"]}
          error={errors["lastName"]}
        />
        <AppSingleDropdown
          title="Gender"
          placeholder="Select Gender"
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "transgender", label: "Transgender" },
          ]}
          value={values["gender"]}
          onChange={handleChange("gender")}
          error={errors["gender"]}
        />
        <AppTextInput
          label="Username"
          placeholder="Enter Username"
          value={values["username"]}
          onChangeText={handleChange("username")}
          touched={touched["username"]}
          error={errors["username"]}
        />
        <AppTextInput
          label="Email"
          placeholder="Enter Email"
          value={values["email"]}
          onChangeText={handleChange("email")}
          touched={touched["email"]}
          error={errors["email"]}
        />
        <AppTextInput
          label="Password"
          placeholder="Enter Password"
          value={values["password"]}
          onChangeText={handleChange("password")}
          touched={touched["password"]}
          error={errors["password"]}
        />
        <AppTextInput
          label="Address1"
          placeholder="Enter Address1"
          value={values["address1"]}
          onChangeText={handleChange("address1")}
          touched={touched["address1"]}
          error={errors["address1"]}
        />
        <AppTextInput
          label="Address2"
          placeholder="Enter Address2"
          value={values["address2"]}
          onChangeText={handleChange("address2")}
          touched={touched["address2"]}
          error={errors["address2"]}
        />
        <AppTextInput
          label="Address3"
          placeholder="Enter Address3"
          value={values["address3"]}
          onChangeText={handleChange("address3")}
          touched={touched["address3"]}
          error={errors["address3"]}
        />
        <AppTextInput
          label="Zip-code"
          placeholder="Enter Zip-code"
          value={values["zip"]}
          onChangeText={handleChange("zip")}
          touched={touched["zip"]}
          error={errors["zip"]}
        />
        <AppTextInput
          label="City"
          placeholder="Enter City"
          value={values["city"]}
          onChangeText={handleChange("city")}
          touched={touched["city"]}
          error={errors["city"]}
        />
        <AppTextInput
          label="State"
          placeholder="Enter State"
          value={values["state"]}
          onChangeText={handleChange("state")}
          touched={touched["state"]}
          error={errors["state"]}
        />
        <AppSingleDropdown
          title="Country"
          placeholder="Select Country"
          options={countriesOptions}
          value={values["country"]}
          onChange={handleChange("country")}
          error={errors["country"]}
        />
        <View
          style={{
            marginBottom: 16,
            width: "100%",
            flexDirection: isTablet ? "row" : "column",
            alignItems: isTablet ? "center" : null,
          }}
        >
          <Text
            style={{
              marginBottom: isTablet ? 0 : 5,
              minWidth: isTablet ? 200 : null,
            }}
          >
            Date of Birth
          </Text>
          <View
            style={{
              width: isTablet ? 350 : "100%",
              marginLeft: isTablet ? 50 : 0,
            }}
          >
            <DatePicker
              placeholder="Select Date of Birth"
              defaultDate={values["dateBirth"]}
              textStyle={{ height: 48 }}
              onDateChange={(date) => setFieldValue("dateBirth", date)}
              maxYears={20}
              minYears={20}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: isTablet ? "flex-end" : "space-between",
          alignItems: "center",
        }}
      >
        <Button
          style={[{ width: isTablet ? 150 : "100%" }]}
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
      </View>
    </Modal>
  );
};

export default AddOrEditUser;

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
  dateAndTimePicker: {
    width: "100%",
    height: 48,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
});
