import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Image, Dimensions, Button, FlatList, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Header } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';



import Modal from './Modal'


const Dev_Height = Dimensions.get("window").height
const Dev_Width = Dimensions.get("window").width


class MapsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            region: [],
            city: '',
            test: '',
            place:[],
            lat:0,
            lng:0
        }
        this.modalRef = React.createRef()
        this.fetch_Nplaces()
    }



    fetch_Nplaces = () => {
        console.warn(this.state.lat)



        Geolocation.getCurrentPosition(info => {
            this.setState({
                lat: info.coords.latitude,
                lng: info.coords.longitude
            })






            fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+info.coords.latitude+'%2C'+info.coords.longitude+'&radius=5000&type=hospital&key=AIzaSyBMigf6M0DHP8JwcR5I4WIcajZ3V5VxtrA')
            .then((response) => response.json())
            .then((json) => {
                
                // alert(JSON.stringify( json.results[0].vicinity))
                // var i = 0
                // var j = 0
                // var k = 0
                // var name = 0
                // var lati = 0
                // var longi = 0
                // var x = ''
                // var y = ''
                // var l = 0
                { this.setState({ city: json.results }) }
                



            })

            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });






            console.warn(info)
        });


        
        // fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.1326%2C5.2913&radius=5000&type=hospital&key=AIzaSyBMigf6M0DHP8JwcR5I4WIcajZ3V5VxtrA')
        //     .then((response) => response.json())
        //     .then((json) => {
                
        //         // alert(JSON.stringify( json.results[0].vicinity))
        //         // var i = 0
        //         // var j = 0
        //         // var k = 0
        //         // var name = 0
        //         // var lati = 0
        //         // var longi = 0
        //         // var x = ''
        //         // var y = ''
        //         // var l = 0
        //         { this.setState({ city: json.results }) }
                



        //     })

        //     .catch((error) => console.error(error))
        //     .finally(() => {
        //         this.setState({ isLoading: false });
        //     });

    }
    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
                <View>
                  
                  {/* {this.setState({place_id : item.place})} */}
                  {/* {console.warn(item.place_id)} */}

                </View>
                {/* {console.log(this.state.photostate)} */}

                {item.photos ? //if
                    <Image style={{ width: 70, height: 70, margin: 5, borderRadius: 150 / 2, }}
                        source={{ uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + item.photos[0].photo_reference + "&key=AIzaSyBMigf6M0DHP8JwcR5I4WIcajZ3V5VxtrA" }}
                    />
                    : //else 
                    <Image style={{ width: 70, height: 70, margin: 5, borderRadius: 150 / 2, resizeMode: 'contain' }}
                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png" }}
                    />
                }
                <TouchableOpacity onPress={() => { this.modalRef.current.setModalVisible(item) }}
                    style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>

                    <Text style={{ fontSize: 18, color: "green", marginBottom: 15, }}>
                        {item.name}
                    </Text>


                </TouchableOpacity>
            </View>
        )
    }
    renderSeparator = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "black" }}>


            </View>

        )
    }


    render() {

        return (
            <View style={styles.MainVieww}>

                <Header
                 
                    // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                    centerComponent={{ text: 'Nearest Clinics', style: { color: '#fff',fontSize:25 } }}
                    // rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <FlatList
                    data={this.state.city}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />



                <Modal ref={this.modalRef} />
            </View>
        );
    };
}




const styles = StyleSheet.create({
    container: {
        height: Dev_Height,
        width: Dev_Width
    },

    Search_Box: {

        borderColor: "black",
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: 'lightgray',
        paddingHorizontal: 15
    },
    MainVieww: {
        flex: 1,


    },
    MapStyle: {
        width: '100%',
        height: '100%',
        position: "absolute",
        marginTop: "50%"

    },
    btnView: {
        width: '30%',
        height: '8%',
        bottom: '40%',
        right: '35%',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6

    }


})

export default MapsScreen;