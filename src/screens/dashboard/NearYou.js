import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Image, Dimensions, Button, FlatList, TouchableOpacity } from 'react-native'
//import MapView from 'react-native-maps';
//import { Marker } from 'react-native-maps';
import { Header } from 'react-native-elements';
//import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';



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
            place: [],
            lat: 0,
            lng: 0,
            errorMessage: '',
            location: {}
        }
        this.modalRef = React.createRef()


    }

    updateState(location) {
        this.setState({
            ...this.state,
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        }, () => { this.fetch_Nplaces() });

    }

    async componentDidMount() {
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            //   console.log(location)
            this.updateState(location);
            //this.fetch_Nplaces(location)
        } catch (error) {
            console.log(error);
        }
    }

    fetch_Nplaces = () => {


        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.lat + '%2C' + this.state.lng + '&radius=5000&type=hospital&key=AIzaSyBMigf6M0DHP8JwcR5I4WIcajZ3V5VxtrA')
            .then((response) => response.json())
            .then((json) => {

                { this.setState({ city: json.results }) }




            })

            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });


    }
    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
                <View>


                </View>
           

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

                    <Text style={{ fontSize: 18, color: "#003C75", marginBottom: 15, }}>
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
                    centerComponent={{ text: 'Near You', style: { color: '#fff', fontSize: 25 } }}
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
