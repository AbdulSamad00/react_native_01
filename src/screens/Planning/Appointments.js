import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import {
  deleteAppointment,
  getAppointment,
  getAppointments,
} from "../../api/appointments";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";
import OperationsAppointment from "./OperationsAppointment";

export default function Appointments({ navigation }) {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedAppointments, setSearchedAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedAppointments, setCheckedAppointments] = useState([]);

  const callForAppointments = async () => {
    setCheckedAppointments([]);
    setAppointments([]);
    setLoading(true);
    const { ok, data } = await getAppointments();
    if (ok) {
      const filterAppointments = data.map((appointment) => {
        return {
          id: appointment._id,
          avatar: appointment.patientNo?.user?.imageSrc,
          Username: appointment.patientNo?.user?.username,
          "First Name": appointment.patientNo?.user?.contactName.first,
          Initials: appointment.patientNo?.user?.contactName.initials,
          "Last Name": appointment.patientNo?.user?.contactName.last,
          "Birth Date": dayjs(appointment.patientNo?.user?.dateBirth).format(
            "DD-MM-YYYY"
          ),
          Email: appointment.patientNo.user.email,
          Gender: appointment.patientNo.user.gender,
          Phone: appointment.patientNo.user.phones.phone,
          Mobile: appointment.patientNo.user.phones.mobile,
          date: moment(appointment.startTime).format("DD-MM-YYYY"),
          starttime: moment(appointment.startTime).format("hh:mm a"),
          endTime: moment(appointment.endTime).format("hh:mm a"),
          Complaint: appointment.title,
          Clinic: appointment.clinicNo?.user?.imageSrc,
          Clinic: appointment.clinicNo.companyInfo.businessName,
          Doctor: appointment.doctorNo?.user?.imageSrc,
          DoctorName: appointment.doctorNo.user.contactName.first,
          Appointment_Type: appointment.appointmentType,
          Session_Type: appointment.sessionType,
          note: appointment.note,
          CreatedOn: moment(appointment.createdOn).format("DD-MM-YYYY"),
          status: appointment.status,
        };
      });

      setAppointments(filterAppointments);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForAppointments();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = appointments.filter(
      (el) =>
        `${el.Appointmentname}`
          .toLowerCase()
          .startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedAppointments(filtered);
  };

  if(showModal) {
    return   (
      <OperationsAppointment
        selectedAppointment={selectedAppointment}
        setSelectedAppointment={setSelectedAppointment}
        visible={showModal}
        setVisible={setShowModal}
        setUpdate={() => setUpdate(!update)}
        update={update}
      />
    )
  }
  
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator visible={loading} />
        <StatusBar backgroundColor={"#00B7DD"} />
        <Header back title={"Appointments"} rightComponent={() => {}} />
        <IconBar
          setLoading={setLoading}
          setShowModal={setShowModal}
          checkedAppointments={checkedAppointments}
          setCheckedAppointments={setSelectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
          appointments={appointments}
          setUpdate={setUpdate}
          update={update}
          navigation={navigation}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedAppointments();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />

        {appointments && appointments.length > 0 && (
          <Table
            tableData={
              searchedAppointments && searchedAppointments.length > 0
                ? searchedAppointments
                : appointments
            }
            showCheckbox
            checked={checkedAppointments}
            setChecked={setCheckedAppointments}
            // multipleAvatar={true}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const IconBar = ({
  setShowModal,
  checkedAppointments,
  setCheckedAppointments,
  appointments,
  setSelectedAppointment,
  setUpdate,
  update,
  navigation,
  setLoading
}) => {

  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            setSelectedAppointment([]);
            setShowModal(true);
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "pink" }}
          color="black"
          onPress={async () => {
            if (checkedAppointments.length < 1) {
              return;
            }
            const item = appointments.filter(
              (appt) => appt.id == checkedAppointments[0]
            )[0];
            setLoading(true)
            const { data } = await getAppointment(item.id)

            const appt = {
              name: `${data?.patientNo?.user?.contactName?.first} ${data?.patientNo?.user?.contactName?.last}`,
              clinicNo: data?.clinicNo,
              doctorNo: data?.doctorNo,
              patientNo: data?.patientNo,
              status: data?.status,
              start: data?.startTime,
              end: data?.endTime,
              Appointment_Type: data?.appointmentType,
              share: data?.share,
              Session_Type: data?.sessionType,
              image: data?.patientNo?.user?.imageSrc,
              gender: data?.patientNo?.user?.gender,
              dateBirth: data?.patientNo?.user?.dateBirth,
              complaint: data?.complaint,
              title: data?.title,
            }
            setLoading(false)
            navigation.navigate("AppointmentProfile", {
              item: appt,
            });
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedAppointments.length === 0) {
              return;
            }

            const { ok, data } = await getAppointment(checkedAppointments[0]);
            if (ok) {
              const cleanAppointment = {
                _id: data._id,
                patientNo: data.patientNo._id,
                clinicNo: data.clinicNo._id,
                doctorNo: data.doctorNo._id,
                date: new Date(data.startTime),
                start: data.startTime,
                end: data.endTime,
                complaint: data.title,
                appointmentType: data.appointmentType,
                sessionType: data.sessionType,
                note: data.note,
                status: data.status,
              };
              setSelectedAppointment(cleanAppointment);
              setShowModal(true);
            }
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedAppointments.length < 1) return null;
            checkedAppointments.forEach(async (appointmentId) => {
              const { ok } = await deleteAppointment(appointmentId);
              if (ok) {
                console.log("deleted");
              }
            });

            setUpdate(!update);
          }}
        />
        <IconButton
          icon="file-delimited"
          style={{ marginLeft: 8, backgroundColor: "lime" }}
          color="white"
        />
        <IconButton
          icon="file-pdf-box"
          style={{ marginLeft: 8, backgroundColor: "red" }}
          color="white"
        />
        <IconButton
          icon="microsoft-excel"
          style={{ marginLeft: 8, backgroundColor: "green" }}
          color="white"
        />
        <IconButton
          icon="printer"
          style={{ marginLeft: 8, backgroundColor: "brown" }}
          color="white"
        />
        <IconButton
          icon="lock"
          style={{ marginLeft: 8, backgroundColor: "red" }}
          color="white"
        />
        <IconButton
          icon="lock-open"
          style={{ marginLeft: 8, backgroundColor: "green" }}
          color="white"
        />
        <IconButton
          icon="hand-right"
          style={{ marginLeft: 8, backgroundColor: "red" }}
          color="white"
        />
        <IconButton
          icon="at"
          style={{ marginLeft: 8, backgroundColor: "#0af" }}
          color="white"
        />
        <IconButton
          icon="chat"
          style={{ marginLeft: 8, backgroundColor: "#0af" }}
          color="white"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 5,
    width: "100%",
  },
  search: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
});
