import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MapView,{ Marker } from 'react-native-maps'


export default class Map extends Component {
    state = {
        place: [],
        lat: 0,
        long: 0,

    }
    async componentDidMount() {


     await this.setState({ lat: this.props.data.location.lat, long: this.props.data.location.lng }) 
    

    }
    render() {

        return (
            // <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>


                


                <MapView style={{width:"100%", height: "69%", marginBottom: 500}}
                scrollEnabled={false}
                showsMyLocationButton={true}
                showsMyLocationButton={true}
                zoomEnabled={true}
                zoomControlEnabled={false}
            zoomTapEnabled={false}
                
               

                    initialRegion={{
                        latitude: this.state.lat,
                        longitude: this.state.long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                >

                    <Marker pinColor="blue"
                        coordinate={{
                            latitude: this.state.lat,
                            longitude: this.state.long,
                        }}
                    >
                    </Marker >
                </MapView>

                // {/* <View style={{ width: '30%', bottom: '40%', left: '35%' }}>
                //     <Button title='Show Clinics' onPress={this.fetch_Nplaces} />



                // </View> */}




            // </View>
        )
    }
}


