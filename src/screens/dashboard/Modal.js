// import { throwStatement } from "@babel/types";
import React, { Component } from "react";
import { Alert, StyleSheet, Text, Image, Pressable, View, TouchableNativeFeedbackBase, TouchableOpacity, ViewPropTypes } from "react-native";
// import { Rating, AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Call, Email} from 'react-native-openanything'



import Map from "./Map";
import { ScrollView } from "react-native-gesture-handler";

class App extends Component {
  state = {
    modalVisible: false,
    Namedata: [],
    starCount: 3.5
  };

  setModalVisible = async (data) => {
    this.setState({ modalVisible: !this.state.modalVisible });
    await this.setState({ Namedata: data })
    // console.warn(this.state.Namedata.geometry.location)


  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const { modalVisible } = this.state;
    const location = this.state.Namedata.geometry
    return (
      <View style={styles.centeredView}>

        <Modal style={{ margin: 0 }}
          animationOut='fadeIn'
          // transparent={true}
          isVisible={modalVisible}
          onBackButtonPress={() => {
            this.setState({ modalVisible: !this.state.modalVisible });
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: 'row' }}>

                  <View>
                    {this.state.Namedata.photos ?
                      <Image style={{ width: 90, height: 90, margin: 5, borderRadius: 150 / 2, top: 10 }}
                        source={{ uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + this.state.Namedata.photos[0].photo_reference + "&key=AIzaSyBMigf6M0DHP8JwcR5I4WIcajZ3V5VxtrA" }}
                      />
                      :
                      <Image style={{ width: 90, height: 90, margin: 5, borderRadius: 150 / 2, resizeMode: 'center', top: 10 }}
                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png" }}
                      />


                    }
                  </View>

                  <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ marginTop: 20 }}>clinic</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                      {this.state.Namedata.name}
                    </Text>

                    <View>
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.Namedata.user_ratings_total}
                        fullStarColor={'yellow'}
                        halfStar={'Android-star-half'}
                        starSize={20}
                        containerStyle={ViewPropTypes.style = { width: 120 }}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                      />
                    </View>

                  </View>

                </View>


                <View style={{ justifyContent: 'center', alignItems: 'flex-end', top: 40 }}>
                  <TouchableOpacity style={{ backgroundColor: "blue", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', width: 170 }} >


                    <Text style={{ color: 'white', fontSize: 16 }}>
                      Make Appointment
                    </Text>


                  </TouchableOpacity>
                </View>


                <View style={{ justifyContent: 'space-around', paddingVertical: 8, flexDirection: 'row', borderTopWidth: 1, alignItems: 'center', marginTop: 50, borderColor: 'gray', paddingHorizontal: 20}}>

                    

                  <TouchableOpacity onPress={() => Call('53 235 856843')} style={{ width: "33.3%", justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: 'gray' }}>

                    <MaterialIcons name="call" size={15} backgroundColor="#3b5998" />
                    <Text>
                      53 235 856843
                    </Text>
                  </TouchableOpacity >

                  <TouchableOpacity onPress={() => Email('maazsid44@gmail.com')} style={{ width: "33.3%", justifyContent: 'center', alignItems: 'center',  borderRightWidth: 1, borderColor: 'gray' }}>

                    <MaterialCommunityIcons name="email" size={15} backgroundColor="#3b5998" />
                    <Text>
                      Email
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity  style={{ width: "33.3%", justifyContent: 'center', alignItems: 'center'}}>

                    <MaterialCommunityIcons name="web" size={15} backgroundColor="#3b5998" />
                    <Text>
                      Website
                    </Text>


                  </TouchableOpacity>
                </View>



                {modalVisible ?
                  <Map data={location} />


                  : null}







                {/* <Text style={styles.modalText}>{JSON.stringify(this.state.Namedata)}</Text> */}

              </View>
            </View>

          </ScrollView>

        </Modal>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    //  justifyContent: "center",
    //   alignItems: "center",
    // marginTop: 22,
    // width:300


  },
  modalView: {
    // margin: 20,
    // borderRadius: 20,
    // padding: 35,
    // alignItems: "center",
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
    width: "100%",
    backgroundColor: 'lightblue'
  },
  starStyle: {
    margin: -10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;