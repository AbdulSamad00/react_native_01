import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { updateClinicUser, getClinicUser } from '../../api/clinics';
import ActivityIndicator from '../../components/ActivityIndicator';
import authStorage from "../../auth/storage";


export default function WorkingHours({ navigation }) {

  const [ selectedDay, setSelectedDay ] = useState("monday")
  const [ loading, setLoading ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ user, setUser ] = useState({})
  const [ userId, setUserId ] = useState(null)
  const [ workingHours, setWorkingHours ] = useState([])
  const [ isFromDatePickerVisible, setFromDatePickerVisibility ] = useState(false);
  const [ isToDatePickerVisible, setToDatePickerVisibility ] = useState(false);

  useEffect(async () => {
    async function getWorkingHours(){
      const currentUser = await authStorage.getCurrentUser();
      setUser(currentUser);
      setLoading(true);
      const result = await getClinicUser(currentUser._id);
      setWorkingHours(result?.data.workingHours);
      setUserId(result.data._id);
      setLoading(false);
    }
    await getWorkingHours();
    handleSelectedDayChanged("monday");
  }, [])

  function handleSelectedDayChanged(day){
    setSelectedDay(day);
  }

  function normalize(number){
    return number >= 10 ? number : '0' + number;
  }

  const showFromDatePicker = () => {
    setFromDatePickerVisibility(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisibility(false);
  };

  const handleFromConfirm = (date) => {
    const endDate = new Date(date.getTime() + (15 * 60 * 1000));
    setWorkingHours(workingHours.map(item => (item.day === selectedDay) ? {
      startTime: normalize(date.getHours()) + ":" + normalize(date.getMinutes()),
      endTime: normalize(endDate.getHours()) + ":" + normalize(endDate.getMinutes()),
      _id: item._id,
      day: item.day,
      open: open
    } : item));
    hideFromDatePicker();
  };

  const handleToConfirm = (date) => {
    setWorkingHours(workingHours.map(item => (item.day === selectedDay) ? {
      endTime:  normalize(date.getHours()) + ":" + normalize(date.getMinutes()),
      startTime: workingHours.filter(item => selectedDay === item.day)[0]?.startTime,
      _id: item._id,
      day: item.day,
      open: open
    } : item));
    hideToDatePicker();
  };

  const handleSwitchChange = (open) => {
    setOpen(open);
    setWorkingHours(workingHours.map(item => (item.day === selectedDay) ? {
      endTime:  item.endTime,
      startTime: item.startTime,
      _id: item._id,
      day: item.day,
      open: open
    } : item));
  } 

  const showToDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const handleClickSave = async () => {
    setLoading(true);
    const data = await updateClinicUser(userId, workingHours);
    console.log(data.data)
    setLoading(false);
  }

  return (
    <View style={ styles.container }>
      <ActivityIndicator visible={loading} />
      <View style={ styles.header }>
        <View style={ styles.headerLeft }>
          <TouchableOpacity 
            onPress={ () => navigation.goBack() }
            >
            <Icon
              name="ios-arrow-back-circle"
              type="ionicon"
              color="#ffff"
              size={35}
            />
          </TouchableOpacity>
        </View>
        <View style={ styles.headerMiddle }>
          <Text style={ styles.text }>Working Hours</Text>
        </View>
      </View>
      <View style={ styles.mainSection }>
        <Text style={ styles.heading }>Week Days</Text>
        <ScrollView 
          horizontal 
          contentContainerStyle={ styles.dayOfWeekScroller } 
          showsHorizontalScrollIndicator={ false }
        >
          {
            workingHours.map(item => (
              <View key={ item.day } style={ [styles.day, { backgroundColor: (selectedDay === item.day) ? "#003C75" : "#E3E3E3", }] }>
                <TouchableOpacity onPress={ () => handleSelectedDayChanged(item.day) }>
                  <Text style={{ color: (selectedDay === item.day) ? "#fff" : "#969696" }}>{ item.day }</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
        <View style={ styles.switchWrapper }>
          <Text>{ workingHours.filter(item => selectedDay === item.day)[0]?.open ? "Open" : "Close" }</Text>
          <Switch value={ workingHours.filter(item => selectedDay === item.day)[0]?.open } onValueChange={ (open) => handleSwitchChange(open) } thumbColor={ workingHours.filter(item => selectedDay === item.day)[0]?.open ? "green" : "red" } trackColor={{ true: "green", false: "red" }} />
        </View>
        <View style={ styles.form }>
          <View style={ styles.field }>
            <Text style={ styles.label }>From: </Text> 
            <TouchableOpacity onPressIn={ showFromDatePicker } style={ styles.textBox }>
              <Text style={ styles.time }>{ workingHours.filter(item => selectedDay === item.day)[0]?.startTime }</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isFromDatePickerVisible}
              is24Hour={ true }
              minuteInterval={ 15 }
              mode="time"
              onConfirm={handleFromConfirm}
              onCancel={hideFromDatePicker}
            />
          </View>
          <View style={ styles.field }>
            <Text style={ styles.label }>To: </Text>
            <TouchableOpacity style={ styles.textBox } onPressIn={ showToDatePicker }>
              <Text style={ styles.time }>{ workingHours.filter(item => selectedDay === item.day)[0]?.endTime }</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isToDatePickerVisible}
              mode="time"
              is24Hour={ true }
              minuteInterval={ 15 }
              onConfirm={handleToConfirm}
              onCancel={hideToDatePicker}
            />
          </View> 
        </View>
        <View style={ styles.btnWrapper }>
          <TouchableOpacity style={ styles.mainBtn } onPress={ handleClickSave }>
            <Text style={ styles.btnText }>Save</Text>
          </TouchableOpacity> 
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1
  },
  header: {
    backgroundColor: "#003C75",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    justifyContent: 'space-between',
    margin: 5,
    borderRadius: 50
  },
  headerLeft: {

  }, 
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headerMiddle: {
    marginRight: "35%",
  },
  mainSection: {
    marginTop: 10,
    padding: 5
  },
  dayOfWeekScroller: {
    
  },
  heading: {
    textAlign:"center",
    marginBottom: 10,
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#003C75",
    padding: 10,
    marginHorizontal: "30%",
    borderRadius: 5
  },
  time: {
    fontSize: 18
  },
  day: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    margin: 3,
    borderRadius: 50,
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  field:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#003C75",
    borderRadius: 10,
    paddingLeft: 5
  },
  label: {
    color: "#003C75",
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    paddingHorizontal: 10
  },
  textBox: {
    backgroundColor: "#fff",
    width: 120,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  btnWrapper: {
    marginTop: 20
  },
  mainBtn: {
    backgroundColor: "#003C75",
    padding: 10,
    borderRadius: 50,
  },
  btnText: {
    color: "#fff",
    textAlign: "center"
  }
})