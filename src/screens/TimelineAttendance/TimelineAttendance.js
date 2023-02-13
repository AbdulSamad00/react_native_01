import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
import { state } from "../../../App";
import { getAppointments } from "../../api/appointments";
import ActivityIndicator from "../../components/ActivityIndicator";
import DateRange from "../../components/DateRange";
import HorizontalTimeline from "./HorizontalTimeline";
import UsersRow from "./UsersRow";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddOrUpdateAppoitment from "../Planning/AddOrUpdateAppoitment";
import Attendance from "./Attendance";
import { getShifts } from "../../api/shifts";
import { Form, FormDatePicker } from "../../components/forms";
import { geteros } from "../../api/eros";
import { getClinics } from "../../api/clinics";
const CELL_WiIDTH = wp("30%");
const appointmentTypes = [
  { label: "Show All", value: 'showAll' },
  { label: "Clinic", value: 'clinic' },
  { label: "At Home", value: 'atHome' },
  { label: "Phone", value: 'phone' },
  { label: "Video", value: 'video' },
]
const TimelineAttendance = () => {

  const { isTablet } = useSnapshot(state);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const date = dayjs().format('DD MMM YYYY')
  const [allData, setAllData] = useState({});
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showInWeek, setShowInWeek] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointmentType, setAppointmentType] = useState(false)
  const [selectedEndDate, setSelectedEndDate] = useState(date)
  const [selectedStartDate, setSelectedStartDate] = useState(date)
  const [appointmentModal, setAppointmentModal] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(dayjs(date).format('DD MMM YYYY'));
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(dayjs(date).format('DD MMM YYYY'));
    }
  };
  const [eros , setEros] = useState([])


  useEffect(() => {
    let unMounted = false;

    (async () => {
      setUsers([]);
      setAppointments([]);
      const { data, ok } = await getShifts();
      const {data:eros} = await geteros()
      let a =eros.map(e=>{return e.user._id} )
     
      const filterData = [];
      let filtered = data.filter(e=>a.includes(e.userNo._id));
      filtered = filtered.filter(
        (appt) =>
          dayjs(appt.createdOn).format("YYYY-MM-DD") ===
          dayjs(selectedDate).format("YYYY-MM-DD")
      );

      filtered.length>0 && filtered.forEach((appt) => {

        const id = `${appt.userNo._id}`
          filterData[id] = {
            ero: {
              name:
                appt.userNo.contactName.first +
                " " +
                appt.userNo.contactName.last,
              image: appt.userNo.imageSrc,
              id: appt.userNo._id,
            },
            department: {
           
                name:
                  appt.department
              },
            
            shift: 
              {
                startTime: dayjs(appt.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                endTime: dayjs(appt.endTime).format("YYYY-MM-DDTHH:mm:ss"),
                title: appt.name,
                ...appt
              },
            
          };
        
      });
      if (!unMounted) {
      
        const allUsers = [];
        const allAppts = [];
        const clinics = await getClinics()
        
        Object.keys(filterData).forEach((id) => {
          
   
            allAppts.push(filterData[id].shift);
          

            allUsers.push({
              doctor: filterData[id].ero.name,
              doctorImg: filterData[id].ero.image,
              patients: filterData[id].department,
             clinic:clinics.data[2].companyInfo.businessName
            });

        });
//setAllData(filterData);
console.log("showIn week "+showInWeek)
setUsers(allUsers);
setAppointments(allAppts);
        setLoading(false);
        setIsRefreshing(false)
      }
    })();

    // selectedDateAppts()
    return () => {
      unMounted = true;
    };
  }, [isRefreshing,selectedDate,showInWeek]);
  const onRefresh = () => {
    setIsRefreshing(true)
  }


  
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const usersRef = useAnimatedRef();
  const timelineRef = useAnimatedRef();
  const appoitmentXRef = useAnimatedRef();
  const appoitmentRef = useAnimatedRef();

  const usersScrollHandler = React.useCallback(
    useAnimatedScrollHandler((event) => {
      positionY.value = event.contentOffset.y;
      scrollTo(appoitmentRef, 0, positionY.value, false);
    }),
    []
  );
  const appointmentYScrollHandler = React.useCallback(
    useAnimatedScrollHandler((event) => {
      positionY.value = event.contentOffset.y;
      scrollTo(usersRef, 0, positionY.value, false);
    }),
    []
  );

  const timelineScrollHandler = React.useCallback(
    useAnimatedScrollHandler((event) => {
      positionX.value = event.contentOffset.x;
      scrollTo(appoitmentXRef, positionX.value, 0, false);
    }),
    []
  );

  const appointmentXScrollHandler = React.useCallback(
    useAnimatedScrollHandler((event) => {
      positionX.value = event.contentOffset.x;
      scrollTo(timelineRef, positionX.value, 0, false);
    }),
    []
  );

  const oldWidth = React.useRef(0);
  const _renderAppointment = React.useCallback(({ item }) => {
    oldWidth.current = 0;
    const a =[item]
    return (
      <Attendance
        selectedDate={selectedDate}
        appointment={[item]}
        oldWidth={oldWidth}
        cellWidth={CELL_WiIDTH}
      />
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator visible={true} />}
      <SafeAreaView />
      <AddOrUpdateAppoitment
       // visible={appointmentModal}
       visible={false}
        setVisible={setAppointmentModal}
        setUpdate={() => setAppointmentModal(false)}
        updateAppointments={() => onRefresh()}
      // selectedDate={new Date()}
      // selectedAppointment={{...item,clinicNo:item.clinicNo._id,patientNo:item.patientNo._id,doctorNo:item.doctorNo._id}}
      // setSelectedAppointment={setSelectedAppointment}
      // updateAppointments={()=>console.log("appointment updated")}
      />
      <Header
        onDateChange={onDateChange}
        selectedEndDate={selectedEndDate}
        setSelectedDate={setSelectedDate}
        setAppointmentType={setAppointmentType}
        setAppointmentModal={setAppointmentModal}
        appointmentType={appointmentType} />
      <Date
        isTablet={isTablet}
        showInWeek={showInWeek}
        setShowInWeek={setShowInWeek}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          flex: 1,
        }}
      >
        {/* left users */}
        <View
          style={{
            // flex: 2,
            width: isTablet ? '30%' : '50%',
          }}
        >
          <UsersRow ero="Ero" department="Department" clinic="Clinic" />
          <AnimatedFlatList
            getItemLayout={(_, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            initialNumRender={users.length}
            data={users}
            ref={usersRef}
            onScroll={usersScrollHandler}
            scrollEventThrottle={60}
            keyExtractor={(_, i) => `${i}`}
            renderItem={({ item }) => {
              // console.log(item.patients.length, 'ITEM')
              return (
                <UsersRow
                  eroImg={item.doctorImg}
                  ero={item.doctor}
                  department={item.patients.name}
                  clinic={item.clinic}
                // patientImg={item.patientImg}
                // patient={item.patient}
                />
              )
            }
            }
          />
        </View>
        {/* right appointment */}
        <View
          style={{
            flex: 3,
            backgroundColor: "white",
          }}
        >
          {/* timeline part */}
          <View
            style={{
              height: 50,
              backgroundColor: "white",
            }}>
            <AnimatedScrollView
              ref={timelineRef}
              onScroll={timelineScrollHandler}
              scrollEventThrottle={60}
              horizontal={true}>
              <HorizontalTimeline week={showInWeek} height={50} cellWidth={CELL_WiIDTH} />
            </AnimatedScrollView>
          </View>
          {/* appointment part */}
          <View
            style={{
              flex: 1,
              // backgroundColor: "green",
            }}>
            <AnimatedScrollView
              ref={appoitmentXRef}
              onScroll={appointmentXScrollHandler}
              scrollEventThrottle={60}
              horizontal
            >
              <AnimatedFlatList
                getItemLayout={(_, index) => ({
                  length: 50,
                  offset: 50 * index,
                  index,
                })}
                initialNumRender={users.length}
                ref={appoitmentRef}
                onScroll={appointmentYScrollHandler}
                scrollEventThrottle={60}
                style={{ width: 24 * CELL_WiIDTH }}
                data={appointments}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(_, i) => `${i}`}
                renderItem={_renderAppointment}
                refreshControl={
                  <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
                isRefreshing={isRefreshing}
              />
            </AnimatedScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TimelineAttendance;

const Header = React.memo(({ appointmentType, setAppointmentType, onDateChange, setSelectedDate, selectedEndDate, setAppointmentModal }) => {
  const refRBSheet = useRef();
  const { isTablet } = useSnapshot(state);
  // const isTablet = true

  return (

    <View style={[isTablet ? styles.header : { paddingHorizontal: 20, height: hp("31%"), backgroundColor: '#fff', marginTop: 10 }]}>
      <View style={isTablet ? { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } : { height: "70%" }}>

        <View style={[styles.headerLeft]}>

          <Button
            title="Add Attendance"
            onPress={() => setAppointmentModal(true)}
            btnColor="#ddd"
            textColor="#555"
            style={isTablet ? { marginRight: 10 } : { marginHorizontal: 5, width: '50%', alignItems: 'center' }}
          />

          <Button
            onPress={() => console.log('btn')}
            title="Status" btnColor="blue"
            style={isTablet ? { marginRight: 10 } : { marginHorizontal: 5, width: '50%', alignItems: 'center' }}
          />


        </View>
        <DateRange refRBSheet={refRBSheet} onDateChange={(date, type) => onDateChange(date, type)} />
        <View style={[styles.headerCenter,
        !isTablet ? { flex : 1 } : { backgroundColor: "#fff", }]}>
          <View style={[isTablet ? { width: 150, marginRight: 10, } : { width: '50%',marginHorizontal:7,marginTop:3  }]}>
            <Dropdown
              //data={appointmentTypes}
              // mainContainerStyle={{backgroundColor:"red",height:70,borderRadius:10s}}
              parentDDContainerStyle={{ backgroundColor: "rgb(200,74,74)" }}
              itemContainerStyle={{ backgroundColor: 'rgb(200,74,74)', }}
              itemTextStyle={{ color: 'white', fontSize: 14 }}
              textInputPlaceholderColor={'white'}
              selectedItemTextStyle={{ fontWeight: 'bold', color: 'white' }}
              textInputPlaceholder={'Attendance'}
              textInputStyle={[{ backgroundColor: 'rgb(200,74,74)', borderRadius: 5, height: 48, width: "100%" },]}
              value={appointmentType}
              onChange={value => {
                setAppointmentType(value)
              }}
            />
          </View>

     

        </View>
        <Form>
        <FormDatePicker
                      left={
                        <Icon
                          name="calendar"
                          size={18}
                          style={{ alignSelf: "center" }}
                        />
                      }
                      name="dateBirth"
                      textStyle={{
                        paddingVertical: 4,
                        paddingHorizontal: 24,
                        borderColor: "grey",
                        borderRadius: 8,
                        borderWidth: 1,
                      }}
                      defaultDate="2022-10-01"
                      maxYears="0"
                      minYears="130"
                              onDateChange={(value) => { 
                                console.log("hadi")
                                setSelectedDate(dayjs(value))}}
                              />

                              </Form>
   
      </View>

      <View style={[isTablet ? { flexDirection: 'row', alignItems: "center", } : styles.headerRight]}>
        <TextInput placeholder="search..." style={styles.searchInput} />
        <Button onPress={() => console.log('btn')} btnColor="transparent">
          <MaterialIcons name="search" color="blue" size={30} />
        </Button>
      </View>
    </View>
  );
});

const Date = React.memo(({
  selectedDate,
  setSelectedDate,
  setShowInWeek,
  showInWeek,
  isTablet
}) => {
  const handleIncreament = () =>
    setSelectedDate(dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"));

  const handleDecreament = () =>
    setSelectedDate(dayjs(selectedDate).add(-1, "day").format("YYYY-MM-DD"));
  const handleToday = () => setSelectedDate(dayjs().format("YYYY-MM-DD"));
  return (
    <View style={styles.date}>
      <View style={styles.dateLeft}>
        <Button
          title="Week"
          textColor={showInWeek ? 'skyblue' : "#555"}
          btnColor="transparent"
          onPress={() => setShowInWeek(true)}
          style={{ marginRight: 5, paddingHorizontal: 5 }}
        />
        <Button
          title="Day"
          onPress={() => setShowInWeek(false)}
          textColor={showInWeek ? '#555' : "skyblue"}
          btnColor="transparent"
          style={{ paddingHorizontal: 5 }}
        />
      </View>
      <View style={styles.dateCenter}>
        <Text style={{ fontSize: 18, textAlign: "center" }}>{showInWeek ? `${dayjs(selectedDate)
          .startOf("week")
          .format("DD MMM")} - ${dayjs(selectedDate)
            .endOf("week")
            .format("DD MMM")} ${isTablet ? dayjs(selectedDate).format("YYYY") : ""
          }` : `${dayjs(selectedDate).format(
            "MMM DD, YYYY"
          )}`}</Text>
      </View>
      <View style={styles.dateRight}>
        <TouchableOpacity onPress={handleDecreament}>
          <MaterialIcons name="keyboard-arrow-left" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleIncreament}>
          <MaterialIcons name="keyboard-arrow-right" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToday}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Today</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const Button = React.memo(
  ({
    title,
    btnColor = "blue",
    textColor = "white",
    style,
    textStyle,
    children,
    onPress
  }) => {
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[
          { backgroundColor: btnColor, paddingHorizontal: 10, borderRadius: 5, paddingVertical: 15 },
          style,
        ]}
      >
        {children ? (
          children
        ) : (
          <Text style={[{ color: textColor, fontWeight: "bold" }, textStyle]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  header: {
    // flex:1,
    backgroundColor: "#fff",
    height: hp("13%"),
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 5
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerCenter: { flexDirection: "row", alignItems: "center" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  searchInput: {
    width: "90%",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    minHeight: 40,
  },
  date: {
    backgroundColor: "#fff",
    // height: hp("10%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  dateLeft: {
    flexDirection: "row",
    alignItems: "center",
    // flex:0.6,
    // backgroundColor:"green"
  },

  dateCenter: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  dateRight: { flexDirection: "row", alignItems: "center" },
  appointment: {
    height: hp("70%"),
  },
  appointmentLeft: {
    width: wp("30%"),
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  appointmentLeftDoctor: {
    width: "50%",
    height: "100%",
  },
  appointmentLeftPatient: {
    width: "50%",
    height: "100%",
  },
  calendarPicker: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingVertical: 12,
    alignItems: 'center',
    // marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    // marginTop: 5

  }
});