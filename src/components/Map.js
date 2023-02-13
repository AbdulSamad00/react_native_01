import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps';


const LAT_DELTA = 0.0015, LNG_DELTA = 0.0021

export default class Map extends Component {

    state = {
        currentLat: 37.78825,
        currentLng: -122.4324
    }

    render() {
        const { currentLat, currentLng } = this.state

        return (

            <MapView
                style={styles.container}
                region={{
                    latitude: currentLat,
                    longitude: currentLng,
                    latitudeDelta: LAT_DELTA,
                    longitudeDelta: LNG_DELTA,
                }}
            />

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
