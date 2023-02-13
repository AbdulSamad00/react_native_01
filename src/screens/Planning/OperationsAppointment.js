import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {Platform,ScrollView,StyleSheet,Text,TouchableOpacity,View,} from "react-native";
import Modal from "react-native-modal";
import { Button, IconButton } from "react-native-paper";
import { state } from "../../../App";
import {deleteAppointment,postAppointment,updateAppointment,getAppointment} from "../../api/appointments";
import { getClinics } from "../../api/clinics";
import { getDoctors } from "../../api/doctors";
import { getPatients } from "../../api/patients";
import DatePicker from "../../components/DatePicker";
import AppTextArea from "../../components/forms/AppTextArea";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import _ from "lodash";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import moment from "moment";
import  AppSingleDropdown from "../../components/forms/AppSingleDropdown";
import AppointementDatePicker from "../../components/AppointementDatePicker";

const OperationsAppointment = ({
  visible,
  setVisible,
  selectedAppointment = {},
  setUpdate,
  updateAppointments,
  setSelectedAppointment,
  selectedDate
}) => {
  
  const [patientOptions, setPatientOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [clinicOptions, setClinicOptions] = useState([]);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const { _id } = selectedAppointment;
 
  const { handleChange, handleSubmit, setFieldValue, resetForm, values } =
    useFormik({
      initialValues: {
        start: "",
        end: "",
        date: new Date(),
        complaint: "",
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
        patientNo: "",
        clinicNo: "",
        doctorNo: "",
        note: "",
        status: "active",
        sessionType: "",
        appointmentType: "clinic"
      },
      onSubmit: async (values) => {
        const selectedDate = dayjs(values.date).format("YYYY-MM-DD");
        let newStart = values.start;
        let newEnd = values.end;
        if (typeof values.start === "object") {
          newStart = `${selectedDate}T${
            values.start.toISOString().split("T")[1]
          }`;
        }
        if (typeof values.end === "object") {
          newEnd = `${selectedDate}T${values.end.toISOString().split("T")[1]}`;
        }
        delete values["date"];
        const filter = { ...values, start: newStart,end: newEnd ,};
        const {_id, ...rest} = filter;
        if (_id) {
          const { ok,data } = await updateAppointment(_id, {...rest});
          if (ok) {
            const { ok,data } = await getAppointment(_id)
            if(ok){
              const temp={
                name: `${data.patientNo.user.contactName.first} ${data.patientNo.user.contactName.last}`,
                dateBirth: data.patientNo.user.dateBirth,
                image:    data.patientNo.user.imageSrc,
                gender:   data.patientNo.user.gender,
                title:    data.title,
                start:    data.startTime,
                end:      data.endTime,
                _id:      data._id,
                date:     data.startTime.split("T")[0],
                color:    data.color,
                sessionType: data.sessionType,
                appointmentType: data.appointmentType,
                status:data.patientNo.status,
                complaint:data.title,
                clinicNo:  data.clinicNo,
                patientNo: data.patientNo,
                //clinicUser: singleAppointment.clinicUser,
                doctorNo: data.doctorNo,
              };
              setSelectedAppointment(temp)
            }
            // }
            hideModal();
          }
        } else {
          const { ok, data, originalError } = await postAppointment(filter);
          console.log(ok,'<-----ok',originalError)
          if (ok) {
            hideModal();
          }
        }
      }
    });

  useEffect(() => {
    if (!_.isEmpty(selectedAppointment)) {
      for (const property in selectedAppointment) {
        setFieldValue(property, selectedAppointment[property]);
      }
    }
  }, [selectedAppointment]);

  const hideModal = () => {
    resetForm();
    setTimeout(() => setVisible(false), 0)
    setUpdate();
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
        <Text>{values._id ? "Update" : "Add"} Appointment</Text>
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
          }}
        />
        <AppSingleDropdown
          title="Doctor"
          placeholder="Select Doctor"
          options={doctorOptions}
          value={values["doctorNo"]}
          onChange={async (value) => {
            setFieldValue("doctorNo", value);
          }}
        />
        <AppSingleDropdown
          title="Clinic"
          placeholder="Select Clinic"
          options={clinicOptions}
          value={values["clinicNo"]}
          onChange={async (value) => {
            setFieldValue("clinicNo", value);
          }}
        />

        <View
          style={{
            flexDirection: isTablet ? "row" : "column",
          }}
        >
          <View
            style={{
              width: isTablet ? wp("27%") : wp("100%"),
            }}
          >
            <Text>Date</Text>
            <DatePicker
              placeholder="New Date"
              defaultDate={values["date"]}
              textStyle={{ height: 48 }}
              onDateChange={(date) => {
                setFieldValue("date", date);
              }}
              maxYears={20}
              minYears={20}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: isTablet ? wp("27%") : wp("40%"),
                marginHorizontal: isTablet ? 10 : 0,
              }}
            >
              <Text>Start-Time</Text>
              <View>
              <AppointementDatePicker 
                name="start" 
                values={ values } 
                setFieldValue={ setFieldValue } 
              />
              </View>
            </View>

            <View
              style={{
                width: isTablet ? wp("27%") : wp("40%"),
              }}
            >
              <Text>End-Time</Text>
              <View>
                  <AppointementDatePicker 
                    name="end" 
                    values={ values } 
                    setFieldValue={ setFieldValue }
                  />
              </View>
            </View>
          </View>
        </View>

        <AppTextArea
          label="Complaint"
          placeholder="Enter Complaint"
          value={values["complaint"]}
          onChangeText={handleChange("complaint")}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 10 }}>Appointment Type</Text>
            <Dropdown
              textInputPlaceholder={"Select Appointment Type"}
              data={[
                { value: "clinic", label: "clinic" },
                { value: "home", label: "home" },
                { value: "phone", label: "phone" },
                { value: "video", label: "video" },
              ]}
              value={values["appointmentType"]}
              onChange={handleChange("appointmentType")}
              mode="flat"
            />
          </View>
          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 10 }}>Session Type</Text>
            <Dropdown
              textInputPlaceholder={"Select Session Type"}
              data={[
                { value: "intake", label: "intake" },
                { value: "follow", label: "follow" },
              ]}
              value={values["sessionType"]}
              onChange={handleChange("sessionType")}
              mode="flat"
            />
          </View>
        </View>

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
            { width: isTablet ? 150 : values._id ? "45%" : "100%" },
            values._id && { marginRight: 10 },
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
        {values._id && (
          <Button
            mode="contained"
            style={{ width: isTablet ? 150 : "45%" }}
            theme={{
              colors: {
                primary: "#d00",
              },
            }}
            onPress={async () => {
              const { ok } = await deleteAppointment(values._id);
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

export default OperationsAppointment;

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