import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { AnimatedFlatList, AnimationType } from "flatlist-intro-animations";

import AuthContext from "./../../auth/context";
import authStorage from "./../../auth/storage";
import { getUser } from "./../../api/users";
import Moment from "moment";
import QRCode from "react-native-qrcode-svg";
import moment from "moment";

export class Home extends Component {
  static contextType = AuthContext;
  state = {
    currentUser: {},
    data: [
      {
        name: "Patient's name",
        complaint: "stress ",
        gender:"Female",
        image:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.katongfamilyclinic.com%2Fuploads%2F9%2F0%2F5%2F5%2F90557217%2Fmedical_orig.jpg&imgrefurl=https%3A%2F%2Fwww.katongfamilyclinic.com%2F&tbnid=bcPSUE-Lu5xKhM&vet=12ahUKEwjfifGVvuT2AhVHw-AKHQzABC8QMyhQegUIARCjAQ..i&docid=Fmkk3XPQABNAdM&w=720&h=450&q=clinic%20images&ved=2ahUKEwjfifGVvuT2AhVHw-AKHQzABC8QMyhQegUIARCjAQ",
        Time: "15 Aug 2020, 10:30 AM - 11:00 AM",
       
        key: 1,
        status:"Active",
        start: new Date(),
        end:new Date(),
        clinicNo:{
          companyInfo:{
            businessName:'TCM'
          }
        },
        doctorNo:{
          user:{
            contactName:{
              first:"John",
              last:"Doe"
            },
            imageSrc:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fclinicalnotebook.com%2Fwp-content%2Fuploads%2F2015%2F04%2FDoctor-Profile-Pic-Example.png&imgrefurl=https%3A%2F%2Fclinicalnotebook.com%2Fdoctor-profile-pic-example%2F&tbnid=wXCML24ppHmGDM&vet=12ahUKEwi984S5veT2AhWQ1eAKHWthDPYQMygJegUIARDnAQ..i&docid=_mAP0escJRc-uM&w=320&h=379&q=profile%20image%20doctor&ved=2ahUKEwi984S5veT2AhWQ1eAKHWthDPYQMygJegUIARDnAQ"
          }
        },
        appointmentType:'Clinic',
        sessionTpe:"Follow",
      },
      {
        status:"Active",
        name: "Dr. John Doe",
        complaint: "hernia ",
        gender:"Male",
        start: new Date(),
        end:new Date(),
        imageSrc: "",
        key: 2,
        appointmentType:'Home',
        sessionTpe:"Intake",
        clinicNo:{
          companyInfo:{
            businessName:'TCM'
          }
        },
        doctorNo:{
          user:{
            contactName:{
              first:"John",
              last:"Doe"
            }
          }
        },

      },
      
    ],
  };

  async componentDidMount() {
    const { user } = this.context;
    try {
      const { data: currentUser, ok } = await getUser(user._id);
      if (ok) {
        this.setState({ currentUser });
      }
    } catch (error) {
      console.log(error);
    }


  }

  RenderItem = (item) => {
    console.log(item, '+++++')
    const selectedAppointment=item
    return (
      <View style={{ backgroundColor: '#fff', flex: 1,marginTop:10 }}>
        <View style={{ paddingHorizontal: 10, }}>

          <View >
            {/* <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Basic Information
              </Text>
            </View> */}
            {/* -------------------------- */}

            <View style={styles.flatlistContainer}>

              <View style={styles.DocDetails}>
                <Text style={styles.DocText}>Clinic : {selectedAppointment?.clinicNo?.companyInfo?.businessName}</Text>
              </View>
              <View style={[styles.FlatListMiddleView]}>
                <View style={styles.FlatlistMiddleLeft}>
                  <View style={styles.ProfileImg}>
                    <Image style={styles.imge} source={{ uri: selectedAppointment?.clinicNo?.user?.imageSrc }} />
                  </View>

                </View>

                <View style={[styles.DetailsContainer, { width: '75%' }]}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingRight: 7 }}>
                    <View >
                      {/* <Text style={styles.DocTextabc}>Date :{item?.start?.split("T")[0]}</Text> */}
                      <Text style={styles.DocTextabc}>{moment(item?.start).format("hh:mm A")} - {moment(selectedAppointment?.end).format("hh:mm A")} </Text>
                      <Text style={styles.DocTextabc}>{item?.appointmentType}</Text>
                      <Text style={styles.DocTextabc}>{item?.sessionType} </Text>
                    </View>
                    <QRCode size={50} value={selectedAppointment?.clinicNo?.companyInfo?.businessName} logoSize={50} logoBackgroundColor="transparent"/>
                  </View>
                </View>
              </View>
              <View style={[styles.FlatListBottomView,]}>
                <TouchableOpacity onPress={() => { item.phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { width: '15%' }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/phone.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { item.phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/mobile.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { item.username ? Linking.openURL(`skype:${username}?chat`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/skype.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/email.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/address.png")} />
                </TouchableOpacity>

              </View>


              <View style={styles.DocDetails}>
                <Text style={styles.DocText}>Clinic : {selectedAppointment?.clinicNo?.companyInfo?.businessName}</Text>
              </View>
              <View style={[styles.FlatListMiddleView]}>
                <View style={styles.FlatlistMiddleLeft}>
                  <View style={styles.ProfileImg}>
                    <Image style={styles.imge} source={{ uri: selectedAppointment?.clinicNo?.user?.imageSrc }} />
                  </View>

                </View>

                <View style={[styles.DetailsContainer, { width: '75%' }]}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingRight: 7 }}>
                    <View >
                      {/* <Text style={styles.DocTextabc}>Date :{item?.start?.split("T")[0]}</Text> */}
                      <Text style={styles.DocTextabc}>{moment(item?.start).format("hh:mm A")} - {moment(selectedAppointment?.end).format("hh:mm A")} </Text>
                      <Text style={styles.DocTextabc}>{item?.appointmentType}</Text>
                      <Text style={styles.DocTextabc}>{item?.sessionType} </Text>
                    </View>
                    <QRCode size={50} value={selectedAppointment?.clinicNo?.companyInfo?.businessName} logoSize={50} logoBackgroundColor="transparent"/>
                  </View>
                </View>
              </View>
              <View style={[styles.FlatListBottomView,]}>
                <TouchableOpacity onPress={() => { item.phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { width: '15%' }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/phone.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { item.phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/mobile.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { item.username ? Linking.openURL(`skype:${username}?chat`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/skype.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/email.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/address.png")} />
                </TouchableOpacity>

              </View>


              <View style={styles.DocDetails}>
                <Text style={styles.DocText}>Clinic : {selectedAppointment?.clinicNo?.companyInfo?.businessName}</Text>
              </View>
              <View style={[styles.FlatListMiddleView]}>
                <View style={styles.FlatlistMiddleLeft}>
                  <View style={styles.ProfileImg}>
                    <Image style={styles.imge} source={{ uri: selectedAppointment?.clinicNo?.user?.imageSrc }} />
                  </View>

                </View>

                <View style={[styles.DetailsContainer, { width: '75%' }]}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingRight: 7 }}>
                    <View >
                      {/* <Text style={styles.DocTextabc}>Date :{item?.start?.split("T")[0]}</Text> */}
                      <Text style={styles.DocTextabc}>{moment(item?.start).format("hh:mm A")} - {moment(selectedAppointment?.end).format("hh:mm A")} </Text>
                      <Text style={styles.DocTextabc}>{item?.appointmentType}</Text>
                      <Text style={styles.DocTextabc}>{item?.sessionType} </Text>
                    </View>
                    <QRCode size={50} value={selectedAppointment?.clinicNo?.companyInfo?.businessName} logoSize={50} logoBackgroundColor="transparent"/>
                  </View>
                </View>
              </View>
              <View style={[styles.FlatListBottomView,]}>
                <TouchableOpacity onPress={() => { item.phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { width: '15%' }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/phone.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { item.phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/mobile.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { item.username ? Linking.openURL(`skype:${username}?chat`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/skype.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/email.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/address.png")} />
                </TouchableOpacity>

              </View>


              <View style={styles.DocDetails}>
                <Text style={styles.DocText}>Clinic : {selectedAppointment?.clinicNo?.companyInfo?.businessName}</Text>
              </View>
              <View style={[styles.FlatListMiddleView]}>
                <View style={styles.FlatlistMiddleLeft}>
                  <View style={styles.ProfileImg}>
                    <Image style={styles.imge} source={{ uri: selectedAppointment?.clinicNo?.user?.imageSrc }} />
                  </View>

                </View>

                <View style={[styles.DetailsContainer, { width: '75%' }]}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingRight: 7 }}>
                    <View >
                      {/* <Text style={styles.DocTextabc}>Date :{item?.start?.split("T")[0]}</Text> */}
                      <Text style={styles.DocTextabc}>{moment(item?.start).format("hh:mm A")} - {moment(selectedAppointment?.end).format("hh:mm A")} </Text>
                      <Text style={styles.DocTextabc}>{item?.appointmentType}</Text>
                      <Text style={styles.DocTextabc}>{item?.sessionType} </Text>
                    </View>
                    <QRCode size={50} value={selectedAppointment?.clinicNo?.companyInfo?.businessName} logoSize={50} logoBackgroundColor="transparent"/>
                  </View>
                </View>
              </View>
              <View style={[styles.FlatListBottomView,]}>
                <TouchableOpacity onPress={() => { item.phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { width: '15%' }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/phone.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { item.phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/mobile.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { item.username ? Linking.openURL(`skype:${username}?chat`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/skype.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/email.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}>
                  <Image style={styles.imge} source={require("../../assets/icons/address.png")} />
                </TouchableOpacity>

              </View>

              {/* last token */}

            </View>
          </View>
        </View>
      </View >
    )
  }
  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.Container}>
        <SafeAreaView />
        <View style={styles.TopContainer}>
          <View style={styles.ContainerForPic}>
            <View style={styles.TopLeftContianer}>
              <View style={styles.imgRenderDesgin}>
                <Image
                  style={styles.faceImg}
                  //source={require("../../assets/man.png")}
                  source={{ uri: currentUser.imageSrc }}
                />
              </View>
            </View>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.nameText}>
                Welcome {currentUser.username} !
              </Text>
              <Text style={styles.DateText}>
                {Moment().format("dddd, MMMM Do YYYY, h:mm a")}
              </Text>
              {/* <Text style={styles.DateText}>Monday, 25 March 2020</Text> */}
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Notifications");
              }}
              style={styles.TopRightContianer}
            >
              <Image
                style={styles.icons}
                source={require("../../assets/icons/bell.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.TopBottomContainer}>
            <View style={styles.TopContain}>
              <Text style={styles.Appoinmtnnumber}>25</Text>
              <Text style={styles.AppoinmntText}>Appointments</Text>
            </View>
            <View style={styles.MiddleContain}>
              <Text style={styles.Sessionnumber}>12</Text>
              <Text style={styles.SessionText}>Sessions</Text>
            </View>
            <View style={styles.BottomContain}>
              <Text style={styles.Patientnumber}>13</Text>
              <Text style={styles.PatientText}>Patients</Text>
            </View>
          </View>
        </View>
        <Text style={styles.TodayText}>
          Today’s Appointments ({this.state.data.length})
        </Text>
        <AnimatedFlatList
          data={this.state.data}
          renderItem={({ item }) => this.RenderItem(item)}
          animationType={AnimationType.Dive}
          keyExtractor={(item) => item.key}
          animationDuration={2500}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    height: h("35%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: 'red',
    width: "90%",
    height: h("15%"),
    flexDirection: "row",
    marginTop: h("2.5%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "55%",
    height: "100%",
    justifyContent: "center",
    paddingLeft: h("2%"),
  },
  TopRightContianer: {
    // backgroundColor: 'tomato',
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgRenderDesgin: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 110 / 2,
  },
  nameText: {
    fontSize: h("3%"),
    fontWeight: "bold",
    color: "white",
  },
  DateText: {
    fontSize: h("2%"),
    color: "white",
  },
  icons: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  faceImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  TopBottomContainer: {
    // backgroundColor: 'red',
    width: "95%",
    height: h("15%"),
    marginTop: h("1%"),
    flexDirection: "row",
    alignItems: "center",
  },
  TopContain: {
    // backgroundColor: 'green',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("2.5%"),
    paddingRight: h("2%"),
    borderRightColor: "#0003",
    borderRightWidth: h("0.1%"),
  },
  MiddleContain: {
    // backgroundColor: 'gold',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("3%"),
    paddingRight: h("2%"),
    borderRightColor: "#0003",
    borderRightWidth: h("0.1%"),
  },
  BottomContain: {
    // backgroundColor: 'tomato',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("3%"),
    paddingRight: h("2%"),
  },
  Apponimtnnumber: {
    fontSize: h("2.5%"),
    fontWeight: "bold",
    color: "white",
  },
  AppoinmntText: {
    fontSize: h("1.2%"),
    color: "white",
  },

  lowerContaierFlatlist: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: h("120%"),
    alignItems: "center",
  },
  flatlistContainer: {
    flex:1,
    backgroundColor: "white",
    width: w("90%"),
    height: h("120%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    // elevation: h('0.1%'),
  },
  TodayText: {
    color: "black",
    fontSize: h("3%"),
  },
  Flatlist: {
    // backgroundColor: '#f2f2',
    alignItems: "center",
  },
  FlatListTopView: {
    // backgroundColor: 'purple',
    width: "100%",
    height: h("5%"),
    alignItems: "flex-end",
  },
  FlatListMiddleView: {
    // backgroundColor: 'orange',
    width: "100%",
    height: h("11%"),
    flexDirection: "row",
  },
  FlatListBottomView: {
    // backgroundColor: 'green',
    width: "100%",
    height: h("6%"),
    alignItems: "center",
    flexDirection: "row",
  },
  ItemContainer: {
    backgroundColor: "#003C75",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemAppoinment: {
    color: "white",
    fontSize: h("1.5%"),
  },
  FlatlistMiddleLeft: {
    // backgroundColor: 'red',
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: h("2%"),
  },
  FlatlistMiddleMiddle: {
    // backgroundColor: 'gold',
    width: "75%",
    height: "100%",
  },
  ProfileImg: {
    // backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 110 / 2,
  },
  imge: {
    width: "100%",
    height: "100%",
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
  ItemSpecilist: {
    color: "#0006",
    fontSize: h("2%"),
  },
  Buttons: {
    width: "35%",
    height: h("5%"),
    // borderColor: "blue",
    // borderWidth: 1,
    // borderRadius: h("12%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Buttonicons: {
    height: "50%",
    width: "20%",
    resizeMode: "contain",
    marginRight: h("0.5%"),
  },
  ButtonText: {
    fontSize: h("2%"),
    color: "#003C75",
  },
  DocDetails: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("5%"),
    paddingLeft: h("2%"),
    justifyContent: "center",
    marginTop:10
  },
  DetailsContainer: {
    // backgroundColor: 'gold',
    width: "100%",
    height: h("10%"),
    paddingLeft: h("1.5%"),
    justifyContent: "center",
  },
  DetailsContainer3: {
    // backgroundColor: 'green',
    width: "100%",
    height: h("18%"),

    justifyContent: "center",
    marginTop: h("1%"),
  },
  DetailsContainer2: {
    // backgroundColor: 'gold',
    width: "100%",
    height: h("5%"),
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  DocText: {
    color: "black",
    fontSize: h("2.5%"),
    fontWeight: "bold",
  },
  DocTextabc: {
    textTransform: "capitalize",
    color: "black",
    fontSize: h("2.2%"),
  },
  uploadContainer: {
    backgroundColor: "white",
    width: "90%",
    height: h("10%"),
    flexDirection: "row",
    borderRadius: h("1%"),
    marginTop: h("2%"),
  },
  leftContainer: {
    // backgroundColor: 'gold',
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  RightContainer: {
    // backgroundColor: 'red',
    width: "60%",
    height: "100%",
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  leftbContainer: {
    // backgroundColor: 'orange',
    width: "20%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  Uploadtext: {
    color: "#000",
    fontSize: h("2.5%"),
  },
  icons: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  paymentSlip:{
    flexDirection:"row",
    alignItems:"center",

    // justifyContent:""
  },
  PaymentHeader:{
    marginRight:'5%'
  }
});
