import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet,SafeAreaView,View,StatusBar, Alert, Text, ScrollView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Navbar } from "../../components";
import authStorage from "./../../auth/storage";
import * as Location from 'expo-location';
import ActivityIndicator from "../../components/ActivityIndicator";
import { GOOGLE_MAPS_APIKEY } from '../../config/apiKeys';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5'; 

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const MapRouting = ({ route }) => {

  const [ loading, setLoading ] = useState(false);
  const [ mode, setMode ] = useState("DRIVING");
  const [ LATITUDE, setLATITUDE ] = useState(null);
  const [ LONGITUDE, setLONGITUDE ] = useState(null);
  const [ LATITUDE_DELTA, setLATITUDE_DELTA ] = useState(null);
  const [ LONGITUDE_DELTA, setLONGITUDE_DELTA ] = useState(null);

  const [ origin, setOrigin ] = useState(null)
  const [ destination, setDestination ] = useState(null)

  const [ originText, setOriginText ] = useState("your location")

  const navigation = useNavigation();  
  
  const mapView = useRef(null)

  useEffect(() => {
    setLoading(true);
    getCurrentLocation()
    .then(() => setLoading(false));
  }, [mode]);

  const getCurrentLocation  = async () => {
    try {
      const user = await authStorage.getCurrentUser();
      
      if (user) {
        const {coords:{longitude,latitude}} = await getLocation();
        
        setLONGITUDE(longitude)
        setLATITUDE(latitude)

        const currentLocationCoord = {
          latitude: latitude,
          longitude: longitude
        };
        const clinicCoordinate = route.params?.coordinates;
        setOrigin(currentLocationCoord)
        setDestination(clinicCoordinate)
        setLATITUDE_DELTA(Math.max(currentLocationCoord.latitude, clinicCoordinate.latitude) - Math.min(currentLocationCoord.latitude, clinicCoordinate.latitude));
        setLONGITUDE_DELTA(LATITUDE_DELTA * ASPECT_RATIO);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getLocation = async () => {
      
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      navigation.goBack();
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    return location;
  }
  
  const onMapPress = (e) => {
    setOrigin(e.nativeEvent.coordinate)
	};

  if(loading) return <ActivityIndicator visible={true} />

    return (
     <View style={styles.container}> 
        <KeyboardAwareScrollView>
        <SafeAreaView />
        <StatusBar />
        <Navbar
          onPress={() => {
            navigation.goBack();
          }}
          Text={"Map directions"}
        />
        <View style={ styles.optionsDashboard }>
          <View style={ styles.position }>
            <Icon style={{ marginRight: 5 }} name="map-marker" size={12} color="white" />
            <Text style={{ color: 'white' }}>
              { originText }
            </Text>
          </View>
          <View style={ styles.position }>
            <Icon style={{ marginRight: 5 }} name="clinic-medical" size={12} color="white" />
            {/* <Text style={{ color: 'white' }}>{ "TCM Files" }</Text> */}
            <Text style={{ color: 'white' }}>{ route?.params?.name }</Text>
          </View>
        </View>
          <MapView
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={styles.map}
            ref={mapView}
            onPress={onMapPress}
          >
              <Marker  key={`coordinate_origin`} coordinate={origin}>
                <View style={styles.originMarker} ></View>
              </Marker>
              <Marker  key={`coordinate_destination`} coordinate={destination} />

              <MapViewDirections
                origin={origin}
                waypoints={ [origin, destination ] }
                destination={ destination }
                apikey={GOOGLE_MAPS_APIKEY}
                mode={ mode }
                strokeWidth={3}
                strokeColor="hotpink"
                optimizeWaypoints={true}
                onStart={(params) => {
                  console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`)
                  console.log(`Duration: ${result.duration} min.`)
                  mapView.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: (width / 20),
                      bottom: (height / 20),
                      left: (width / 20),
                      top: (height / 20),
                    }
                  });
                }}
                onError={(errorMessage) => {
                  Alert.alert("Map Error", errorMessage);
                }}
              />
          </MapView>
          <ScrollView horizontal style={{ height: 40, width:'100%', backgroundColor: 'white', paddingVertical: 5 }}>
            {
              [ "BICYCLING", "WALKING", "DRIVING", "TRANSIT" ].map(item => (
                <View key={ item } style={[styles.modeItem, { backgroundColor: (mode === item) ? "#003C75" : "#E3E3E3" }] }>
                  <TouchableOpacity onPress={ () => setMode(item) }>
                    <Text style={{ color: (mode === item) ? "#fff" : "#969696" }}>{ item.toLowerCase() }</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
          </ScrollView> 
        </KeyboardAwareScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 140,
    },
    modeItem: {
      marginHorizontal: 5,
      borderRadius: 50,
      paddingHorizontal: 20,
      paddingVertical: 5
    },
    originMarker: {
      width: 20,
      height: 20,
      borderRadius: 50,
      opacity: 0.7,
      backgroundColor: "#003C75"
    },
    optionsDashboard: {
      height: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 2
    },
    position: {
      flexDirection: 'row',
      marginHorizontal: 5,
      borderRadius: 50,
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: '#003C75',
      
    }
  });
  

export default MapRouting;