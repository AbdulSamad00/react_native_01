import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import {FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import Animated, {scrollTo, useAnimatedRef, useAnimatedScrollHandler, useSharedValue, } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
import { state } from "../../../App";
import { getTickets } from "../../api/tickets";
import ActivityIndicator from "../../components/ActivityIndicator";
import DateRange from "../../components/DateRange";
import Ticket from "./Ticket";
import HorizontalTimeline from "./HorizontalTimeline";
import UsersRow from "./UsersRow";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import AddOrUpdateTicket from "../../Planning/AddOrUpdateTicket";
const CELL_WiIDTH = wp("30%");
const ticketTypes = [
  { label: "Show All", value: 'showAll' },
  { label: "Clinic", value: 'clinic' },
  { label: "At Home", value: 'atHome' },
  { label: "Phone", value: 'phone' },
  { label: "Video", value: 'video' },
]
const TimelineTickets = () => {

  const { isTablet } = useSnapshot(state);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const date = dayjs().format('DD MMM YYYY')
  const [allData, setAllData] = useState({});
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [showInWeek, setShowInWeek] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ticketType, setTicketType] = useState(false)
  const [selectedEndDate, setSelectedEndDate] = useState(date)
  const [selectedStartDate, setSelectedStartDate] = useState(date)
  const [ticketModal, setTicketModal] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(dayjs(date).format('DD MMM YYYY'));
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(dayjs(date).format('DD MMM YYYY'));
    }
  };

  useEffect(() => {
    let unMounted = false;
    if (!unMounted) {
      setSelectedDate(dayjs().format("YYYY-MM-DD"));
      setLoading(false);
    }
    (async () => {
      const { data, ok } = await getTickets();
      if (!ok) return;
      const filterData = [];
      data.forEach((appt) => {
        console.log(appt.startTime)

        const id = `${appt.doctorNo._id}`
        const participantId = `${appt.participantNo._id}`;
        if (filterData[id]) {

          if (filterData[id].participants.findIndex(item => item.id == participantId) == -1) {


            filterData[id].participants.push({
              name:
                appt.participantNo.user.contactName.first +
                " " +
                appt.participantNo.user.contactName.last,
              image: appt.participantNo.user.imageSrc,
              id: appt.participantNo._id,
              startTime: dayjs(appt.startTime).format("YYYY-MM-DDTHH:mm:ss"),
              endTime: dayjs(appt.endTime).format("YYYY-MM-DDTHH:mm:ss"),
            })
          } else {
            const index = filterData[id].participants.findIndex(item => item.id == participantId)
            const prevParticipant = filterData[id].participants[index]
            const newParticipant = {
              startTime: dayjs(appt.startTime).format("YYYY-MM-DDTHH:mm:ss"),
              endTime: dayjs(appt.endTime).format("YYYY-MM-DDTHH:mm:ss"),
              name:
                appt.participantNo.user.contactName.first +
                " " +
                appt.participantNo.user.contactName.last,
              image: appt.participantNo.user.imageSrc,
              id: appt.participantNo._id,
            }
            filterData[id].participants.splice(index, prevParticipant, newParticipant)

            console.log(prevParticipant)
          }

          filterData[id].tickets.push({
            startTime: dayjs(appt.startTime).format("YYYY-MM-DDTHH:mm:ss"),
            endTime: dayjs(appt.endTime).format("YYYY-MM-DDTHH:mm:ss"),
            image: appt.participantNo.user.imageSrc,
            title: appt.title,
            color: appt.color,
            name: appt.participantNo.user.contactName.first + " " + appt.participantNo.user.contactName.last,
            participantId: appt.participantNo._id,
            ...appt
          });

        } else {
          // console.log(id, "ID")
          filterData[id] = {
            doctor: {
              name:
                appt.doctorNo.user.contactName.first +
                " " +
                appt.doctorNo.user.contactName.last,
              image: appt.doctorNo.user.imageSrc,
              id: appt.doctorNo._id,
            },
            participants: [
              {
                startTime: dayjs(appt.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                endTime: dayjs(appt.endTime).format("YYYY-MM-DDTHH:mm:ss"),
                name:
                  appt.participantNo.user.contactName.first +
                  " " +
                  appt.participantNo.user.contactName.last,
                image: appt.participantNo.user.imageSrc,
                id: appt.participantNo._id,
              },
            ],
            tickets: [
              {
                startTime: dayjs(appt.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                endTime: dayjs(appt.endTime).format("YYYY-MM-DDTHH:mm:ss"),
                image: appt.participantNo.user.imageSrc,
                title: appt.title,
                color: appt.color,
                name: appt.participantNo.user.contactName.first_name + " " + appt.participantNo.user.contactName.last,
                participantId: appt.participantNo._id,
                ...appt
              },
            ],
          };
        }
      });
      if (!unMounted) {
        setAllData(filterData);
        // filterData.map(data=>)
        // setTickets(filterData?.tickets)
        setLoading(false);
        setIsRefreshing(false)
      }
    })();

    // selectedDateAppts()
    return () => {
      unMounted = true;
    };
  }, [isRefreshing]);
  const onRefresh = () => {
    setIsRefreshing(true)
  }

  useEffect(() => {
    let unMounted = false;
    (() => {
      if (allData) {
        const allUsers = [];
        const allAppts = [];
        Object.keys(allData).forEach((id) => {
          const selectedDateAppts = allData[id].tickets.filter(
            (appt) =>
              dayjs(appt.startTime).format("YYYY-MM-DD") ===
              dayjs(selectedDate).format("YYYY-MM-DD")
          );
          const selectedDateParticipants = allData[id].participants.filter(
            (appt) =>
              // selectedDateAppts.includes(appt.id)
              dayjs(appt.startTime).format("YYYY-MM-DD") ==
              dayjs(selectedDate).format("YYYY-MM-DD")
          );

          console.log(allData[id].participants[0].startTime, "_____", selectedDate)
          if (selectedDateAppts.length > 0) {
            allAppts.push(selectedDateAppts);
            allUsers.push({
              doctor: allData[id].doctor.name,
              doctorImg: allData[id].doctor.image,
              participants: selectedDateParticipants
            });

          }
        });
        if (!unMounted) {
          setUsers(allUsers);
          setTickets(allAppts);
        }

      }
    })();

    return () => {
      unMounted = true;
    };

  }, [selectedDate]);
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
  const ticketYScrollHandler = React.useCallback(
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

  const ticketXScrollHandler = React.useCallback(
    useAnimatedScrollHandler((event) => {
      positionX.value = event.contentOffset.x;
      scrollTo(timelineRef, positionX.value, 0, false);
    }),
    []
  );

  const oldWidth = React.useRef(0);
  const _renderTicket = React.useCallback(({ item }) => {
    oldWidth.current = 0;
    return (
      <Ticket
        selectedDate={selectedDate}
        ticket={item}
        oldWidth={oldWidth}
        cellWidth={CELL_WiIDTH}
      />
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator visible={true} />}
      <SafeAreaView />
      
      {/* <AddOrUpdateTicket
        visible={ticketModal}
        setVisible={setTicketModal}
        setUpdate={() => setTicketModal(false)}
        updateTickets={() => onRefresh()}
      // selectedDate={new Date()}
      // selectedTicket={{...item,clinicNo:item.clinicNo._id,participantNo:item.participantNo._id,doctorNo:item.doctorNo._id}}
      // setSelectedTicket={setSelectedTicket}
      // updateTickets={()=>console.log("ticket updated")}
      /> */}

      <Header
        onDateChange={onDateChange}
        selectedEndDate={selectedEndDate}
        selectedStartDate={selectedStartDate}
        setTicketType={setTicketType}
        setTicketModal={setTicketModal}
        ticketType={ticketType} />
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
            width: isTablet ? '30%' : '50%'
          }}
        >
          <UsersRow doctor="Doctor" participant="Participant" />
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
              // console.log(item.participants.length, 'ITEM')
              return (
                <UsersRow
                  doctorImg={item.doctorImg}
                  doctor={item.doctor}
                  participants={item.participants}
                // participantImg={item.participantImg}
                // participant={item.participant}
                />
              )
            }
            }
          />
        </View>
        {/* right ticket */}
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
          {/* ticket part */}
          <View
            style={{
              flex: 1,
              // backgroundColor: "green",
            }}>
            <AnimatedScrollView
              ref={appoitmentXRef}
              onScroll={ticketXScrollHandler}
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
                onScroll={ticketYScrollHandler}
                scrollEventThrottle={60}
                style={{ width: 24 * CELL_WiIDTH }}
                data={tickets}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(_, i) => `${i}`}
                renderItem={_renderTicket}
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

export default TimelineTickets;

const Header = React.memo(({ ticketType, setTicketType, onDateChange, selectedStartDate, selectedEndDate, setTicketModal }) => {
  const refRBSheet = useRef();
  const { isTablet } = useSnapshot(state);
  // const isTablet = true

  return (

    <View style={[isTablet ? styles.header : { paddingHorizontal: 20, height: hp("31%"), backgroundColor: '#fff', marginTop: 10 }]}>
      <View style={isTablet ? { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } : { height: "70%" }}>

        <View style={[styles.headerLeft]}>

          <Button
            title="Add Ticket"
            onPress={() => setTicketModal(true)}
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
              data={ticketTypes}
              // mainContainerStyle={{backgroundColor:"red",height:70,borderRadius:10s}}
              parentDDContainerStyle={{ backgroundColor: "rgb(200,74,74)" }}
              itemContainerStyle={{ backgroundColor: 'rgb(200,74,74)', }}
              itemTextStyle={{ color: 'white', fontSize: 14 }}
              textInputPlaceholderColor={'white'}
              selectedItemTextStyle={{ fontWeight: 'bold', color: 'white' }}
              textInputPlaceholder={'Ticket'}
              textInputStyle={[{ backgroundColor: 'rgb(200,74,74)', borderRadius: 5, height: 48, width: "100%" },]}
              value={ticketType}
              onChange={value => {
                setTicketType(value)
              }}
            />
          </View>

          <Button
            style={isTablet ? { marginRight: 10 } : { alignItems: 'center',width:'49%' }}
            onPress={() => console.log('btn')}
            title="Session Type"
            btnColor="green"
          />

        </View>
        <TouchableOpacity
          style={[styles.calendarPicker,]}
          onPress={() => refRBSheet.current.open()}>
          <Icon
            name="calendar"
            size={18}
          // style={{ alignSelf: "center" }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', textAlign: 'center' }}>{selectedStartDate}-{selectedEndDate}</Text>
          </View>
          <Icon
            name="chevron-down"
            size={22}
          // style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
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
  ticket: {
    height: hp("70%"),
  },
  ticketLeft: {
    width: wp("30%"),
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  ticketLeftDoctor: {
    width: "50%",
    height: "100%",
  },
  ticketLeftParticipant: {
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