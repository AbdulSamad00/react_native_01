import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
const deviceWidth = Dimensions.get('window').width;
import { w, h } from 'react-native-responsiveness';
import { Icon } from 'react-native-elements';
import SharingInfo from '../../components/SharingInfo/index';
import TabComments from '../../components/TabComments'
import TabNotes from '../../components/TabNotes'
// react native hook
import { useDeviceOrientation } from '@react-native-community/hooks';
// @package
import * as Device from 'expo-device';
import Checkbox from 'expo-checkbox';
import DatePickerFuture from '../../components/DatePickerFuture';
import { AirbnbRating } from 'react-native-ratings';
import { AppSingleDropdown } from '../homeo/components/InterviewTab';
import { options, actions } from '../../config/pickerElements';
import DropdownActions from '../../components/DropdownActions';
import moment from 'moment';
import NavigationDropdown from '../../components/NavigationDropdown';


import TabSharing from "../../components/TabSharing";






const log = console.log;
// import Header from './components/Header';
export function AppointmentInfo(props) {

  const { landscape } = useDeviceOrientation();
  const [deviceType, setDeviceType] = useState('');
  const [navPicker, setnavPicker] = useState('basic_information');
  const [Actions, setActions] = useState('actions');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [view, setView] = useState(false);
  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);
  const [counter, setCounter] = useState(1);
  const [components, setComponents] = useState([1]);
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(false);
  const [accordion3, setAccordion3] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false)
  const item = props.route?.params?.item
  const [selectedAppointment, setSelectedAppointment] = useState(item)
  function addComponent() {
    setCounter(counter + 1);
    components.push(counter);
  }

  function removeComponent() {
    components.pop();
    setCounter(counter - 1);
  }


  useEffect(async () => {

    try {
      let device_type = await Device.getDeviceTypeAsync();
      if (device_type === 1) setDeviceType('Mobile');
      else if (device_type === 2) setDeviceType('Tablet');
    } catch (err) {
      log('error', err);
    }
  }, [selectedAppointment]);
  if (appointmentModal) {
    return (
      <OperationsAppointment
        visible={appointmentModal}
        setVisible={setAppointmentModal}
        selectedDate={new Date()}
        selectedAppointment={{ ...item, clinicNo: item.clinicNo._id, patientNo: item.patientNo._id, doctorNo: item.doctorNo._id }}
        setSelectedAppointment={setSelectedAppointment}
        updateAppointments={() => console.log("appointment updated")}
      />
    );
  }
  return (
    <View style={{ backgroundColor: '#fff', flex: 1, }}>
      <SafeAreaView style={{ flex: 1, }}>
        {/* Header */}
        <View style={[styles.TopContainer]}>
          <View style={styles.ContainerForPic}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Agenda", { updated: selectedAppointment != item });
              }}
              style={styles.TopLeftContianer}
            >
              <Icon
                name={'arrow-back-outline'}
                type="ionicon"
                color="#fff"
                size={35}
              />
            </TouchableOpacity>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.nameText}>Directory List</Text>
            </View>
          </View>
        </View>
        {/* Header */}
        <ScrollView scrollEnabled={true} style={{ flex: 1, paddingBottom: 50, overflow: "hidden", }} >
          {/* nav bar */}
          <View style={[styles.navBarContainer]}>
            {deviceWidth < 800 ? (
              <View style={{ width: '59%' }}>
                <NavigationDropdown onChange={val => setnavPicker(val)} />
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#FFC69F' }]}
                  onPress={() => setnavPicker('AboutMe')}
                >
                  <Text>Basic Information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#DED99F' }]}
                >
                  <Text>Data Spreadsheet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setnavPicker('Address')}
                  style={[styles.navTab, { backgroundColor: '#FFC6FF' }]}
                >
                  <Text>Comments</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#FFF5AD' }]}
                >
                  <Text>Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#A2F5AD' }]}
                  onPress={() => setnavPicker('WorkingTime')}
                >
                  <Text>Sharing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setnavPicker('BusinessInfo')}
                  style={[styles.navTab, { backgroundColor: '#FFFFC9' }]}
                >
                  <Text>Business Information</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ width: '38%', }}>

              <DropdownActions value={Actions} onChange={val => { setActions(val); val == "edit" ? setAppointmentModal(true) : null }} />

            </View>
          </View>
          {/* <DropdownActions /> */}

          <View style={{ paddingHorizontal: 10, }}>
            {navPicker == 'basic_information' ?
              null
              : navPicker == 'comments' ?
                <>
                  <TabComments navigation={props.navigation} />
                </>
                : navPicker == 'notes' ?
                  <>
                    <TabNotes navigation={props.navigation} />
                  </>
                  : navPicker == "attachments" ?
                    null
                    : navPicker == "reviews" ?
                      null
                      : navPicker == "sharing" &&
                      <>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{ fontSize: 30, fontWeight: 'bold', color: 'green' }}
                          >
                            Share with others
                          </Text>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: Dimensions.get('screen').width * 0.8,
                              marginTop: 20,
                            }} >
                            <TouchableOpacity
                              style={{
                                width: '45%',
                                backgroundColor: 'green',
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                              }}
                            >
                              <Text style={{ color: 'white' }}>Copy sharing link</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                width: '45%',
                                backgroundColor: '#49B6D6',
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                              }}
                              onPress={() => addComponent()}
                            >
                              <Text style={{ color: 'white' }}>Add User/Email</Text>
                            </TouchableOpacity>
                          </View>
                          {components.map((component) => (
                            <View
                              key={component}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 30,
                                width: '100%',
                              }}>
                              {counter > 1 && (
                                <TouchableOpacity
                                  style={{
                                    width: '45%',
                                    backgroundColor: 'red',
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 30,
                                  }}
                                  onPress={() => removeComponent()}
                                >
                                  <Text style={{ color: 'white' }}>Delete</Text>
                                </TouchableOpacity>
                              )}
                              <SharingInfo />
                            </View>
                          ))}

                          <TouchableOpacity
                            style={{
                              width: '45%',
                              backgroundColor: '#49B6D6',
                              height: 40,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 30,
                              marginTop: 20,
                            }}>
                            <Text style={{ color: 'white' }}>Send invitation</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              width: Dimensions.get('screen').width,
                              height: 50,
                              backgroundColor: 'black',
                              marginTop: 20,
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                            }}
                            onPress={() => setAccordion1(!accordion1)}
                          >
                            <Text style={{ color: 'white', marginLeft: 10 }}>
                              Access Control List
                            </Text>
                          </TouchableOpacity>
                          {accordion1 && (
                            <>
                              <View
                                style={{
                                  width: '70%',
                                  height: 50,
                                  backgroundColor: '#c4c4c4',
                                  borderRadius: 30,
                                  paddingLeft: 10,
                                  marginTop: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                  User: Dr. No
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '70%',
                                  height: 50,
                                  backgroundColor: '#c4c4c4',
                                  borderRadius: 30,
                                  paddingLeft: 10,
                                  marginTop: 20,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                  Email: info@gmail.com
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  width: '80%',
                                  alignSelf: 'center',
                                }}
                              >
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '25%',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Checkbox
                                    value={view}
                                    onValueChange={setView}
                                    style={{ marginRight: 10 }}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: 'bold',
                                      marginTop: 10,
                                      marginBottom: 10,
                                    }}
                                  >
                                    View
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '25%',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Checkbox
                                    value={comment}
                                    onValueChange={setComment}
                                    style={{ marginRight: 10 }}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: 'bold',
                                      marginTop: 10,
                                      marginBottom: 10,
                                    }}
                                  >
                                    Comment
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '25%',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Checkbox
                                    value={edit}
                                    onValueChange={setEdit}
                                    style={{ marginRight: 10 }}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: 'bold',
                                      marginTop: 10,
                                      marginBottom: 10,
                                    }}
                                  >
                                    Edit
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  width: '100%',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => setShowCalendar(!showCalendar)}
                                  style={{
                                    marginTop: 20,
                                    width: '30%',
                                    height: 40,
                                    backgroundColor: 'black',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 30,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: 'white',
                                    }}
                                  >
                                    Share Till
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={{
                                    marginTop: 20,
                                    width: '30%',
                                    height: 40,
                                    backgroundColor: 'red',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 30,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: 'white',
                                    }}
                                  >
                                    Delete
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={{
                                    marginTop: 20,
                                    width: '30%',
                                    height: 40,
                                    backgroundColor: 'green',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 30,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: 'white',
                                    }}
                                  >
                                    Submit
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View
                                style={{
                                  width: '90%',
                                }}
                              >
                                {showCalendar && (
                                  <DatePickerFuture
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    display="default"
                                    onChange={(e, selectedDate) => {
                                      const currentDate = selectedDate || date;
                                      setShowCalendar(Platform.OS === 'ios');
                                      setDate(currentDate);
                                    }}
                                  />
                                )}
                              </View>
                            </>
                          )}
                          <TouchableOpacity
                            style={{
                              width: Dimensions.get('screen').width,
                              height: 50,
                              backgroundColor: 'black',
                              marginTop: 20,
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                            }}
                            onPress={() => setAccordion2(!accordion2)}
                          >
                            <Text style={{ color: 'white', paddingLeft: 10 }}>
                              Publicity
                            </Text>
                          </TouchableOpacity>
                          {accordion2 && (
                            <View style={{ width: '100%' }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  width: '95%',
                                  alignItems: 'center',
                                  marginTop: 20,
                                }}
                              >
                                <FontAwesome5
                                  name="dot-circle"
                                  size={24}
                                  color="#D5DBE0"
                                />
                                <Text style={{ marginLeft: 10, color: 'black' }}>
                                  Only users linsted in Access Control List haave access
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  width: '95%',
                                  alignItems: 'center',
                                  marginTop: 20,
                                }}
                              >
                                <FontAwesome5
                                  name="dot-circle"
                                  size={24}
                                  color="#7FD5D5"
                                />
                                <Text style={{ marginLeft: 10, color: '#7FD5D5' }}>
                                  Publish over the world
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  width: '95%',
                                  alignItems: 'center',
                                  marginTop: 20,
                                }}
                              >
                                <FontAwesome5
                                  name="dot-circle"
                                  size={24}
                                  color="#FFADAB"
                                />
                                <Text style={{ marginLeft: 10, color: '#FFADAB' }}>
                                  Access by having link for everyone
                                </Text>
                              </View>
                            </View>
                          )}
                          <TouchableOpacity
                            style={{
                              width: Dimensions.get('screen').width,
                              height: 50,
                              backgroundColor: 'black',
                              marginTop: 20,
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                            }}
                            onPress={() => setAccordion3(!accordion3)}
                          >
                            <Text style={{ color: 'white', paddingLeft: 10 }}>
                              Settings
                            </Text>
                          </TouchableOpacity>
                          {accordion3 && (
                            <View
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '90%',
                                alignSelf: 'center',
                                marginTop: 20,
                              }}
                            >
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  width: '50%',
                                  alignItems: 'center',
                                }}
                              >
                                <Checkbox
                                  value={check1}
                                  onValueChange={setCheck1}
                                  style={{ marginRight: 10 }}
                                />
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}
                                >
                                  Allow viewers to download, save, copy
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  width: '50%',
                                  alignItems: 'center',
                                  marginTop: 20,
                                }}
                              >
                                <Checkbox
                                  value={check2}
                                  onValueChange={setCheck2}
                                  style={{ marginRight: 10 }}
                                />
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}
                                >
                                  Checkbox level 2
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>


                      </>

            }

          </View>
        </ScrollView>
      </SafeAreaView>
    </View >
  )
}

// const styles = StyleSheet.create({
//   statusAndPriorityContainer: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-around",
//   },
//   CategoryFieldPicker2: {
//     width: "50%",
//     flexDirection: "column",
//   },
// });


// <View style={styles.navPicker}>
//   <Picker
//     mode={'dropdown'}
//     style={[styles.headerPicker]}
//     selectedValue={navPicker}
//     onValueChange={(itemValue, itemIndex) =>
//       setnavPicker(itemValue)
//     }
//   >
//     <Picker.Item
//       label="Select Options"
//       value=""
//       key={'unselectable'}
//     />
//     <Picker.Item
//       color={'#E911DB'}
//       label="Basic Information"
//       value="basic_information"
//     />

//     <Picker.Item
//       color={'#1F11E9'}
//       label="Comments"
//       value="comments"
//     />
//     <Picker.Item
//       color={'#11A8E9'}
//       label="Reviews"
//       value="reviews"
//     />
//     <Picker.Item
//       color={'#11E9BE'}
//       label="Sharing"
//       value="sharing"
//     />
//     <Picker.Item
//       onValueChange={(itemValue, itemIndex) =>
//         setnavPicker(itemValue)
//       }
//       color={'#e7387a'} label="Attachments" value="attachments" />

//     <Picker.Item color={'#11E93C'} label="Notes" value="notes" />

//   </Picker>
// </View>
{/* <Picker
                style={styles.headerPicker}
                selectedValue={Actions}
                onValueChange={(itemValue, itemIndex) => setActions(itemValue)}
              >
                <Picker.Item label="Actions" value="actions" key={'unselectable'} />
                <Picker.Item color={'#E911DB'} label="Save" value="Save" />
                <Picker.Item color={'#8411E9'} label="Edit" value="Edit" />
                <Picker.Item color={'#1F11E9'} label="Print" value="Print" />
                <Picker.Item color={'#11A8E9'} label="Share" value="Share" />
                <Picker.Item
                  color={'#11E9BE'}
                  label="Archive"
                  value="Archive"
                />
                <Picker.Item
                  color={'#11E93C'}
                  label="Save as PDF"
                  value="Save as PDF"
                />
                <Picker.Item
                  color={'#d2e738'}
                  label="Save as XML"
                  value="Save as XML"
                />
                <Picker.Item
                  color={'#e7387a'}
                  label="Save as CSV"
                  value="Save as CSV"
                />
              </Picker> */}