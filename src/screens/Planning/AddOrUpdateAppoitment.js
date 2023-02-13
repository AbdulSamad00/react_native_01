import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { Button, IconButton } from "react-native-paper";
import { state } from "../../../App";
import {
  deleteAppointment,
  postAppointment,
  updateAppointment,
} from "../../api/appointments";
import { getClinic, getClinics } from "../../api/clinics";
import { getDoctor, getDoctors } from "../../api/doctors";
import { getPatient, getPatients } from "../../api/patients";
import DatePicker from "../../components/DatePicker";
import AppTextArea from "../../components/forms/AppTextArea";
import AppSingleDropdown from "../../components/forms/AppSingleDropdown";

const AddOrUpdateAppoitment = ({
  visible,
  setVisible,
  selectedDate = new Date(),
  selectedAppointment = {},
  updateAppointments
}) => {
  const [patientOptions, setPatientOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [clinicOptions, setClinicOptions] = useState([]);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const {
    _id,
    start,
    end,
    complaint,
    color,
    patientNo,
    clinicNo,
    doctorNo,
    patientUser,
    doctorUser,
    clinicUser,
    note,
    status,
    sessionType,
    appointmentType,
  } = selectedAppointment;

  const { handleChange, handleSubmit, setFieldValue, resetForm, values } =
    useFormik({
      initialValues: {
        start: start ? start : "",
        end: end ? end : "",
        date: selectedDate ? selectedDate : "",
        complaint: complaint ? complaint : "",
        color: color ? color : "",
        patientNo: patientNo ? patientNo : "",
        clinicNo: clinicNo ? clinicNo : "",
        doctorNo: doctorNo ? doctorNo : "",
        patientUser: patientUser ? patientUser : "",
        doctorUser: doctorUser ? doctorUser : "",
        clinicUser: clinicUser ? clinicUser : "",
        note: note ? note : "",
        status: status ? status : "active",
        sessionType: sessionType ? sessionType : "",
        appointmentType: appointmentType ? appointmentType : "",
      },
      onSubmit: async (values) => {
        console.log("Submited Data");
        const selectedDate = dayjs(values.date).format("YYYY-MM-DD");
        const newStart = `${selectedDate}T${
          values.start.toISOString().split("T")[1]
        }`;
        const newEnd = `${selectedDate}T${
          values.end.toISOString().split("T")[1]
        }`;
        delete values["date"];
        const filter = { ...values, start: newStart, end: newEnd };
        console.log(filter);
        if (_id) {
          const { ok } = await updateAppointment(_id, filter);
          console.log(ok);
          if (ok) {
            hideModal();
          }
        
        } else {
          const { ok, data, originalError } = await postAppointment(filter);
          console.log(data);
          console.log(originalError);
          console.log(ok);
          if (ok) {
            hideModal();
          }
          hideModal();
        }
      },
    });

  const hideModal = () => {
    resetForm();
    setVisible(false);
    if(updateAppointment!==undefined){
      updateAppointments()
    }
  };

  const getPatientsForSelect = async () => {
    const { ok, data } = await getPatients();
    if (ok) {
      const filter = data.map((patient) => ({
        label: `${patient.patients.contactName.first} ${patient.patients.contactName.last}`,
        value: patient._id,
      }));
      setPatientOptions(filter);
    }
  };
  const getDoctorsForSelect = async () => {
    const { ok, data } = await getDoctors();
    if (ok) {
      const filter = data.map((doctor) => ({
        label: `${doctor.doctors.contactName.first} ${doctor.doctors.contactName.last}`,
        value: doctor._id,
      }));
      setDoctorOptions(filter);
    }
  };
  const getClinicsForSelect = async () => {
    const { ok, data } = await getClinics();
    if (ok) {
      const filter = data.map((clinic) => ({
        label: clinic.companyInfo.businessName,
        value: clinic._id,
      }));
      setClinicOptions(filter);
    }
  };

  const [isTablet, setIsTablet] = useState(state.isTablet);

  useEffect(() => {
    getPatientsForSelect();
    getDoctorsForSelect();
    getClinicsForSelect();
    setIsTablet(state.isTablet);
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
          title="Patient"
          placeholder="Select Patient"
          options={patientOptions}
          value={values["patientNo"]}
          onChange={async (value) => {
            setFieldValue("patientNo", value);
            const { ok, data } = await getPatient(value);
            if (ok) setFieldValue("patientUser", data[0].user);
          }}
        />
        <AppSingleDropdown
          title="Doctor"
          placeholder="Select Doctor"
          options={doctorOptions}
          value={values["doctorNo"]}
          onChange={async (value) => {
            setFieldValue("doctorNo", value);
            const { ok, data } = await getDoctor(value);
            if (ok) setFieldValue("doctorUser", data[0].user);
          }}
        />
        <AppSingleDropdown
          title="Clinic"
          placeholder="Select Clinic"
          options={clinicOptions}
          value={values["clinicNo"]}
          onChange={async (value) => {
            setFieldValue("clinicNo", value);
            const { ok, data } = await getClinic(value);
            if (ok) setFieldValue("clinicUser", data[0].user);
          }}
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
            Select Date
          </Text>
          <View
            style={{
              width: isTablet ? 350 : "100%",
              marginLeft: isTablet ? 50 : 0,
            }}
          >
            <DatePicker
              placeholder="New Date"
              defaultDate={values["date"]}
              textStyle={{ height: 48 }}
              onDateChange={(date) => {
                console.log(date);
                setFieldValue("date", date);
              }}
              maxYears={20}
              minYears={20}
            />
          </View>
        </View>

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
            Select Start-Time
          </Text>
          <View
            style={{
              width: isTablet ? 350 : "100%",
              marginLeft: isTablet ? 50 : 0,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowStart(true)}
              style={styles.dateAndTimePicker}
            >
              <Text>
                {values["start"]
                  ? dayjs(values["start"]).format("HH:mm")
                  : "Select Start-Time"}
              </Text>
            </TouchableOpacity>
            {showStart && (
              <DateTimePicker
                testID="dateTimePicker"
                minuteInterval={5}
                value={new Date()}
                mode={"time"}
                display="spinner"
                onChange={(e, selectedTime) => {
                  setShowStart(Platform.OS === "ios");
                  setFieldValue("start", selectedTime);
                }}
              />
            )}
          </View>
        </View>

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
            Select End-Time
          </Text>
          <View
            style={{
              width: isTablet ? 350 : "100%",
              marginLeft: isTablet ? 50 : 0,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowEnd(true)}
              style={styles.dateAndTimePicker}
            >
              <Text>
                {values["end"]
                  ? dayjs(values["end"]).format("HH:mm")
                  : "Select End-Time"}
              </Text>
            </TouchableOpacity>
            {showEnd && (
              <DateTimePicker
                value={
                  values["start"]
                    ? new Date(dayjs(values["start"]).add(5, "minute"))
                    : new Date()
                }
                minuteInterval={5}
                mode={"time"}
                display="spinner"
                onChange={(e, selectedTime) => {
                  setShowEnd(Platform.OS === "ios");
                  setFieldValue("end", selectedTime);
                }}
              />
            )}
          </View>
        </View>

        <AppTextArea
          label="Complaint"
          placeholder="Enter Complaint"
          value={values["complaint"]}
          onChangeText={handleChange("complaint")}
        />

        <AppSingleDropdown
          title="Appointment Type"
          placeholder="Select Appointment Type"
          options={[
            { value: "clinic", label: "clinic" },
            { value: "home", label: "home" },
            { value: "phone", label: "phone" },
            { value: "video", label: "video" },
          ]}
          value={values["appointmentType"]}
          onChange={handleChange("appointmentType")}
        />

        <AppSingleDropdown
          title="Session Type"
          placeholder="Select Session Type"
          options={[
            { value: "intake", label: "intake" },
            { value: "follow", label: "follow" },
          ]}
          value={values["sessionType"]}
          onChange={handleChange("sessionType")}
        />

        <AppTextArea
          label="Note"
          placeholder="Enter Note"
          value={values["note"]}
          onChangeText={handleChange("note")}
        />

        <AppSingleDropdown
          title="Status"
          placeholder="Select Status"
          options={[
            { value: "canceled<24", label: "canceled<24" },
            { value: "delayed", label: "delayed" },
            { value: "invoiced", label: "invoiced" },
            { value: "arrived", label: "arrived" },
            { value: "intreatment", label: "intreatment" },
            { value: "active", label: "active" },
          ]}
          value={values["status"]}
          onChange={handleChange("status")}
        />
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
          style={[
            { width: isTablet ? 150 : _id ? "45%" : "100%" },
            _id && { marginRight: 10 },
          ]}
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
            style={{ width: isTablet ? 150 : "45%" }}
            theme={{
              colors: {
                primary: "#d00",
              },
            }}
            onPress={async () => {
              const { ok } = await deleteAppointment(_id);
              if (ok) {
                console.log("deleted");
                hideModal();
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

export default AddOrUpdateAppoitment;

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
