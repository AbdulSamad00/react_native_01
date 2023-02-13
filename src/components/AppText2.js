import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Image} from 'react-native';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';

export class AppText2 extends Component {
  render() {
    return (
      <>
        <View style={styles.Topmargin4}>
          <View style={styles.HeaderText4}>
            <Text style={styles.HeaderTextf4}>{this.props.Header}</Text>
          </View>
          <View style={styles.container4}>
            <TextInput
              {...this.props}
              style={styles.txtinput4}
              placeholder={this.props.placeholder}
              placeholderTextColor={'black'}
              secureTextEntry={this.props.password}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container4: {
    // backgroundColor: '#fff',
    width: '97%',
    height: h('7%'),
    borderRadius: h('1.5%'),
    flexDirection: 'row',

    borderBottomColor: '#0005',
    borderBottomWidth: h('0.2%'),
  },
  txtinput4: {
    // backgroundColor: 'tomato',
    width: '90%',
    height: h('7%'),
    paddingLeft: h('1.5%'),
    color: 'black',
  },

  HeaderText4: {
    // backgroundColor: 'red',
    width: '83%',
    height: h('2.8%'),
    justifyContent: 'center',
    marginLeft: h('1%'),
  },
  HeaderTextf4: {
    color: '#0006',
    fontSize: h('2.2%'),
  },
  Topmargin4: {
    marginTop: h('4%'),
  },
});
