import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyDatePicker from './DatePick';


export class NavForum extends Component {
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
                color={this.props.color?this.props.color:'#fff'}
                size={35}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.middle}>
            <Text style={styles.TextFont}>{this.props.Text}</Text>
          </View>
          <View style={styles.Right   }  >
          <TouchableOpacity style={{width:'50%'  }} >
            <MaterialIcons name="add" size={30} style={styles.iconSearch} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={{width:'50%' }} >
            <MaterialIcons name="search" size={30} style={styles.iconSearch} color='#fff' />

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
  iconSearch: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

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
