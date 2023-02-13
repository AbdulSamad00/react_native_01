import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import MyDatePicker from './DatePick';
import { MaterialIcons } from "@expo/vector-icons";

export class Navbar extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Container}>
          <TouchableOpacity style={styles.left}>
            <TouchableOpacity
              {...this.props}
              delayPressIn={0}
              style={styles.icon}>
              <Icon
                name={'arrow-back-outline'}
                type="ionicon"
                color="#0007"
                size={35}
              />
            </TouchableOpacity>
            
          </TouchableOpacity>
          <View style={styles.middle}>
            <Text style={styles.TextFont}>{this.props.Text}</Text>
          </View>
          <View style={styles.Right}>
          <MyDatePicker />
          <TouchableOpacity style={{width:'100%'  }} >
            <MaterialIcons name="search" size={30} style={styles.iconSearch} color='#484848' />
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#00B7DD',
    width: '100%',
    height: h('7%'),
    flexDirection: 'row',
  },
  left: {
    width: '20%',
    height: '100%',
  },
  middle: {
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Right: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  TextFont: {
    color: 'white',
    fontSize: h('3.2%'),
    fontWeight: 'bold',
  },
  icon: {
    // backgroundColor: 'tomato',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
