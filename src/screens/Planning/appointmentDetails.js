import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class AppoinmentDetails extends Component {
  state = {
    data: [
      {
        name: "Dr. John Doe",
        Specilist: "Cardiologist ",
        Appointments: "As Consultant",
        Time: "15 Aug 2020, 10:30 AM - 11:00 AM",
        key: 1,
        mode: "Video Call",
        Action: "Completed",
      },
    ],
    active: "Active",
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
        <SafeAreaView />
          {/* header */}
          <View style={styles.TopContainer}>
            <View style={styles.ContainerForPic}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={styles.TopLeftContianer}
              >
                <Icon
                  name={"arrow-back-outline"}
                  type="ionicon"
                  color="#fff"
                  size={35}
                />
              </TouchableOpacity>
              <View style={styles.TopMiddleContianer}>
                <Text style={styles.nameText}>Appointment of.....</Text>
              </View>
            </View>
          </View>
          {/* header */}

          {/* token1 */}
          <View style={styles.flatlistContainer}>
            <View style={styles.FlatListTopView}>
              <View style={styles.ItemContainer}>
                <Text style={styles.itemAppoinment}>Active</Text>
              </View>
            </View>

            <View style={styles.DocDetails}>
              <Text style={styles.DocText}>Clinic Name</Text>
            </View>
            <View style={styles.FlatListMiddleView}>
              <View style={styles.FlatlistMiddleLeft}>
                <View style={styles.ProfileImg}>
                  <Image style={styles.imge} source={require("../../assets/icons/clinic.png")}/>
                </View>
              </View>
            <View style={styles.DetailsContainer}>
              <Text style={styles.DocTextabc}>Date starttime-endtime </Text>
              <Text style={styles.DocTextabc}>AppointmentType</Text>
              <Text style={styles.DocTextabc}>SessionType </Text>			  
            </View>
              <View style={styles.FlatlistMiddleLeft}>
                <View style={styles.ProfileImg}>
                  <Image style={styles.imge} source={require("../../assets/icons/mappin.png")}/>
                </View>
              </View>
		  
            <View style={styles.DocDetails}>
              <Text style={styles.DocText}>Patient Detail</Text>
            </View>
            <View style={styles.FlatListMiddleView}>
              <View style={styles.FlatlistMiddleLeft}>
                <View style={styles.ProfileImg}>
                  <Image style={styles.imge} source={require("../../assets/patient.png")}/>				
                </View>
              </View>
            <View style={styles.DetailsContainer}>
              <Text style={styles.DocTextabc}>Sam Alex </Text>
              <Text style={styles.DocTextabc}>Male </Text>
              <Text style={styles.DocTextabc}>45 Years Old</Text>
            </View>
            <View style={styles.DocDetails}>
              <Text style={styles.DocText}>Complaint</Text>
            </View>

			
            <View style={styles.DocDetails}>
              <Text style={styles.DocText}>Doctor Detail</Text>
            </View>
            <View style={styles.FlatListMiddleView}>
              <View style={styles.FlatlistMiddleLeft}>
                <View style={styles.ProfileImg}>
                  <Image style={styles.imge} source={require("../../assets/icons/doctor.png")}/>
                </View>
              </View>

              <View style={styles.FlatlistMiddleMiddle}>
                <Text style={styles.Itemname}>Dr. John Doe</Text>
                <Text style={styles.ItemSpecilist}>Cardiologist </Text>
              </View>
            </View>
			  <View style={styles.FlatListBottomView}>
				<TouchableOpacity style={styles.Buttons}>
                  <Image style={styles.imge} source={require("../../assets/icons/phone.png")}/>
				</TouchableOpacity>
				<TouchableOpacity
				  style={[styles.Buttons, { marginLeft: h("1%"), width: "30%" }]}
				>
                  <Image style={styles.imge} source={require("../../assets/icons/videochat.png")}/>
				</TouchableOpacity>
			  </View>
				<TouchableOpacity
				  style={[styles.Buttons, { marginLeft: h("1%"), width: "30%" }]}
				>
                  <Image style={styles.imge} source={require("../../assets/icons/messages.png")}/>
				</TouchableOpacity>
			  </View>
			
          </View>
          {/* end token */}

          {/* token 2  */}
          <View style={styles.flatlistContainer2}>
            <View style={styles.DocDetails}>
              <Text style={styles.DocText}>Documents & Reports</Text>
              {/* upload button */}
              <TouchableOpacity style={styles.uploadContainer}>
                <View style={styles.leftContainer}>
                  <Image
                    style={styles.icons}
                    source={require("../../assets/doc.png")}
                  />
                </View>
                <View style={styles.RightContainer}>
                  <Text style={styles.Uploadtext}>Upload File</Text>
                </View>
                <View style={styles.leftbContainer}>
                  <Image
                    style={styles.icons2}
                    source={require("../../assets/eye.png")}
                  />
                </View>
              </TouchableOpacity>
              {/* end upload button */}
              {/* upload button */}
              <TouchableOpacity style={styles.uploadContainer}>
                <View style={styles.leftContainer}>
                  <Image
                    style={styles.icons}
                    source={require("../../assets/doc.png")}
                  />
                </View>
                <View style={styles.RightContainer}>
                  <Text style={styles.Uploadtext}>Upload File</Text>
                </View>
                <View style={styles.leftbContainer}>
                  <Image
                    style={styles.icons2}
                    source={require("../../assets/eye.png")}
                  />
                </View>
              </TouchableOpacity>
              {/* end upload button */}
            </View>
          </View>
          {/* End token 2  */}

          {/* token 3  */}
          <View style={styles.flatlistContainer3}>
            <View style={styles.DocDetails}>
              <Text style={styles.DocText}>Prescriptions</Text>
            </View>
            {/* upload button */}
            <TouchableOpacity style={styles.uploadContainer}>
              <View style={styles.leftContainer}>
                <Image
                  style={styles.icons}
                  source={require("../../assets/doc.png")}
                />
              </View>
              <View style={styles.RightContainer}>
                <Text style={styles.Uploadtext}>Upload File</Text>
              </View>
              <View style={styles.leftbContainer}>
                <Icon
                  name={"close-outline"}
                  type="ionicon"
                  color="#E93030"
                  size={35}
                />
              </View>
            </TouchableOpacity>
            {/* end upload button */}
            {/* upload button */}
            <TouchableOpacity style={styles.uploadContainer}>
              <View style={styles.leftContainer}>
                <Image
                  style={styles.icons}
                  source={require("../../assets/doc.png")}
                />
              </View>
              <View style={styles.RightContainer}>
                <Text style={styles.Uploadtext}>Upload File</Text>
              </View>
              <View style={styles.leftbContainer}>
                <Icon
                  name={"close-outline"}
                  type="ionicon"
                  color="#E93030"
                  size={35}
                />
              </View>
            </TouchableOpacity>
            {/* end upload button */}
            {/* upload button */}
            <TouchableOpacity style={styles.uploadContainer}>
              <View style={styles.leftContainer}>
                <Image
                  style={styles.icons}
                  source={require("../../assets/u.png")}
                />
              </View>
              <View style={styles.RightContainer}>
                <Text style={styles.Uploadtext}>Upload File</Text>
              </View>
              <View style={styles.leftbContainer}></View>
            </TouchableOpacity>
            {/* end upload button */}
          </View>
          {/* End token 3  */}

          {/* last token */}
          <View style={styles.flatlistContainer4}>
            <View style={styles.FlatListTopView}>
              <View style={styles.ItemContainer2}>
                <Text style={styles.itemAppoinment}>Invoiced</Text>
              </View>
            </View>
            <View style={styles.DocDetails}>
              <Text style={styles.DocText}>Payment Details</Text>
            </View>

            <View style={styles.DetailsContainer3}>
              <View style={styles.paymentSlip}>
                <Text style={styles.PaymentHeader}>Amount</Text>
                <Text style={styles.PaymentHeader}>Payment Method</Text>
              </View>
              <View style={[styles.paymentSlip, { paddingRight: h("2%") }]}>
                <Text style={[styles.PaymentChild, { marginRight: h("5%") }]}>
                  ₹100.00
                </Text>
				   <TouchableOpacity style={styles.Buttons}>
					<Image
						style={styles.Buttonicons}
						source={require("../../assets/icons/payment2.png")}
					/>
				  </TouchableOpacity>
              </View>
              <View style={styles.paymentSlip}>
                <Text style={styles.PaymentHeader}>Transaction Id</Text>
                <Text style={styles.PaymentHeader}>
                  Transaction Date & Time
                </Text>
              </View>
              <View style={styles.paymentSlip}>
                <Text style={styles.PaymentChild}>22124009800</Text>
                <Text style={styles.PaymentChild}>04/15/2020 10:30 AM</Text>
              </View>
            </View>
          </View>
          {/* last token */}
			  <View style={styles.FlatListBottomView}>
				<TouchableOpacity style={styles.Buttons}>
				  <Image
					style={styles.Buttonicons}
					source={require("../../assets/icons/edit.png")}
				  />
				  <Text style={styles.ButtonText}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
				  style={[styles.Buttons, { marginLeft: h("1%"), width: "30%" }]}
				>
				  <Image
					style={styles.Buttonicons}
					source={require("../../assets/icons/import.png")}
				  />
				  <Text style={styles.ButtonText}>Upload</Text>
				</TouchableOpacity>
			  </View>
		  
            <View style={styles.FlatListBottomView}>
               <TouchableOpacity style={styles.Buttons}>
 			  	<Image
					style={styles.Buttonicons}
					source={require("../../assets/icons/edit.png")}
  			    />
              </TouchableOpacity>
               <TouchableOpacity style={styles.Buttons}>
 				<Image
					style={styles.Buttonicons}
					source={require("../../assets/icons/import.png")}
  			    />
              </TouchableOpacity>
			  
          </View>

         {/* <Appbtn txt={"Cancel Appointment"} /> */}
         </View> 
         </View> 
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: h("190%"),
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    height: h("11%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: "red",
    width: "100%",
    height: h("6%"),
    flexDirection: "row",
    marginTop: h("2.5%"),
    paddingLeft: h("2%"),
    paddingRight: h("3%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: h("2.5%"),
    fontWeight: "bold",
    color: "white",
  },

  lowerContaierFlatlist: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: h("120%"),
    alignItems: "center",
  },
  flatlistContainer: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("60%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    // elevation: h('0.1%'),
  },
  flatlistContainer4: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("30%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    // elevation: h('0.1%'),
  },
  flatlistContainer2: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("30%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistContainer3: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("43%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    alignItems: "center",
    // elevation: h('0.1%'),
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
    paddingLeft: h("1.5%"),
  },
  ItemContainer: {
    backgroundColor: "#003C75",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ItemContainer2: {
    backgroundColor: "#3DC03A",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemAppoinment: {
    color: "white",
    fontSize: h("2%"),
  },
  FlatlistMiddleLeft: {
    // backgroundColor: 'red',
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  FlatlistMiddleMiddle: {
    // backgroundColor: 'gold',
    width: "75%",
    height: "100%",
  },
  ProfileImg: {
    // backgroundColor: 'white',
    width: 75,
    height: 75,
    borderRadius: 110 / 2,
  },
  imge: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  Itemname: {
    color: "black",
    fontSize: h("3%"),
  },
  ItemTime: {
    color: "#003C75",
    fontSize: h("2.2%"),
    fontWeight: "bold",
  },
  ItemTime3: {
    color: "#D0021B",
    fontSize: h("2.2%"),
    fontWeight: "bold",
  },
  ItemSpecilist: {
    color: "#0006",
    fontSize: h("2%"),
  },
  ItemTime2: {
    color: "#0006",
    fontSize: h("2%"),
  },
  Buttons: {
    width: "45%",
    height: h("5%"),
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: h("12%"),
    flexDirection: "row",
    alignItems: "center",
  },
  Buttonicons: {
    height: "50%",
    width: "40%",
    // backgroundColor: "red",
    resizeMode: "contain",
  },
  ButtonText: {
    fontSize: h("2%"),
    color: "#003C75",
  },
  DocDetails: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("7%"),
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  DetailsContainer: {
    // backgroundColor: 'gold',
    width: "100%",
    height: h("10%"),
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  DetailsContainer3: {
    // backgroundColor: 'green',
    width: "100%",
    height: h("16%"),

    justifyContent: "center",
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
    fontSize: h("3%"),
    fontWeight: "bold",
  },
  DocTextabc: {
    color: "black",
    fontSize: h("2.4%"),
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
  icons2: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  paymentSlip: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("4%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  PaymentHeader: {
    color: "#0007",
    fontSize: h("2.5%"),
  },
  PaymentChild: {
    color: "#000",
    fontSize: h("2.2%"),
  },
});
