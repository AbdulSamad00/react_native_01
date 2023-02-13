import React, { Component, ignoredYellowBox, useState } from 'react'
import { View, Text, LogBox, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import {  } from 'react-native-gesture-handler';
import { w, h } from 'react-native-responsiveness';
import moment from 'moment';
import ActivityIndicator from '../../ActivityIndicator';
import { Navbar } from '../../Navbar';
const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
const  getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const AppointmentInfo = ({ route, navigation }) => {
//   console.log(route?.params.item);
  const {name, start, end, gender, dateBirth,image, complaint, doctorNo }  = route?.params.item;
  const age = getAge(dateBirth);
  const {imageSrc} = route?.params.item.doctorNo.user;
  const doctorContacts = route?.params.item.doctorNo.contacts;

  const startTime = start ? moment(start).format('hh:mm A') : '';
  const endTime = end ? moment(end).format('hh:mm A') : '';
  const doctorName = toTitleCase(doctorNo.user.contactName.first + " " + doctorNo.user.contactName.last);
  
  console.log(doctorNo);
  if(!route) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
        {/* Navbar */}
        <Navbar
            onPress={() => {
            navigation.goBack();
            }}
            Text={`Appointment of ${name}`}
            textStyle={{
                fontSize: h('2.2%'),
                width: '120%',
                marginLeft: w('10%')
            }}
        
        />

        {/* Time and Date of Appointment */}
        <Text style={{
            textAlign: 'center',
            marginTop: h('2.5%'),
            fontSize: h('2.2%')
        }}>
            {startTime} - {endTime}
        </Text>

        <View style={{
            padding: 20,
            marginTop: h('2.5%')
        }}> 
            <Text style={{
                fontSize: h('2.2%'),
                fontWeight: 'bold'
            }}>Patient Detail</Text>
            <View style={{
                flexDirection: 'row',
                marginTop: h('3%'),
                padding: 6,
            }}>
                <Image 
                    source={{ uri: image}}
                    style={{
                        height: h('12%'),
                        width: h('12%'),
                        marginRight: w('4%')
                    }}
                />
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <Text style={{ fontSize: h('2.2%')}}>{name}</Text>
                    <Text style={{ fontSize: h('2.2%')}}>{gender}</Text>
                    <Text style={{ fontSize: h('2.2%')}}>{age} Years Old</Text>
                </View>
            </View>

            {/* Complaint */}
            <View>
                <Text style={{
                    fontSize: h('2.2%'),
                    fontWeight: 'bold',
                    marginTop: h('4%')
                }}>
                    Complaint
                </Text>
                <Text style={{ fontSize: h('2%'), marginTop: 10}}>{" " ? "Nothing to show": complaint}</Text>
            </View>
            {/* Doctor Detials */}
            <View>
                <Text style={{
                        fontSize: h('2.2%'),
                        fontWeight: 'bold',
                        marginTop: h('4%')
                    }}>Doctor Detail</Text>

                <View style={{
                    padding: 10
                }}>
                    <Text style={{ marginTop: h('1%'), fontSize: h('2%')}}>{doctorName}</Text>
                    <Text></Text>
                </View>
            </View>
            <View
            style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity onPress={() => { doctorContacts ? Linking.openURL(`tel:${doctorContacts[0]}`) : alert("No number found") }} style={[styles.Buttons, { width: '15%' }]}>
                  <Image style={styles.imge} source={require("../../../assets/icons/phone.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, styles.imge, { marginLeft: w("5%")}]}
                >
                  <Image style={styles.imge} source={require("../../../assets/icons/videochat.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, styles.imge]}
                >
                  <Image style={styles.imge} source={require("../../../assets/icons/comment.png")} />
                </TouchableOpacity>

            </View>

        </View>




    </ScrollView>
  )
}

const styles = StyleSheet.create({
    imge: {
        width: h('10%'),
        height: w('10%'),
        resizeMode: "contain",
      },
      Itemname: {
        color: "black",
        fontSize: h("2.5%"),
      },
      ItemTime: {
        color: "#003C75",
        fontSize: h("1.5%"),
        fontWeight: "bold",
        marginTop: h("1.1%"),
      },




  });

export default AppointmentInfo;