import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const polyline = require('@mapbox/polyline');
const key = 'AIzaSyC6bBM-RV4qqBiyAlZQgxyQtojBUABMhdY';
export default function MapRoute() {
  const [coordinates, setCoordinates] = useState({
    start_location: [48.85, 2.352395],
    end_location: [52.1326625, 5.2913671],
  });
  const [data, setData] = useState({});
  const [path, setPath] = useState({});
  const [origin, setOrigin] = useState({
    latitude: 48.8568332,
    longitude: 2.3510991,
  });
  const [destination, setDestination] = useState({
    latitude: 48.8032139,
    longitude: 2.1236142,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${key}`
      );
      const json = await response.json();
      let points = polyline.decode(json.routes[0].overview_polyline.points);
      setPath(
        points.map((point) => {
          return { latitude: point[0] || 0, longitude: point[1] || 0 };
        })
      );
      setData(json.routes[0].legs[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    setCoordinates({
      start_location: [
        data.start_location.lat || 0,
        data.start_location.lng || 0,
      ],
      end_location: [data.end_location.lat || 0, data.end_location.lng || 0],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = () => {
    fetchData();
    setCoordinates({
      start_location: [
        data.start_location.lat || 0,
        data.start_location.lng || 0,
      ],
      end_location: [data.end_location.lat || 0, data.end_location.lng || 0],
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: coordinates.start_location[0] || 0,
          longitude: coordinates.start_location[1] || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showUserLocation
        followUserLocation
        loadingEnabled
        style={styles.map}
      >
        <Marker
          draggable
          key={1}
          coordinate={{
            latitude: coordinates.start_location[0] || 0,
            longitude: coordinates.start_location[1] || 0,
          }}
          title={'data?.start_address'}
          description={'data?.start_address'}
        />
        <Marker
          draggable
          key={2}
          coordinate={{
            latitude: coordinates.end_location[0] || 0,
            longitude: coordinates.end_location[1] || 0,
          }}
        />
        {!loading && <Polyline coordinates={path} strokeWidth={5} />}
      </MapView>
      <View style={styles.info}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={(text) => setOrigin(text)}
          value={origin}
          placeholder='Enter origin'
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={(text) => setDestination(text)}
          value={destination}
          placeholder='Enter destination'
        />
        <TouchableOpacity
          style={{
            height: 40,
            backgroundColor: 'grey',

            width: 60,
          }}
          title='update route'
          onPress={() => updateData()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 60,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});