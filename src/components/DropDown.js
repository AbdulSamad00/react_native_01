import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Image} from 'react-native';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';

export class DropDown extends Component {
  render() {
    return (
      <>
        <View style={styles.Topmargin}>
          <View style={styles.HeaderText}>
            <Text style={styles.HeaderTextf}>{this.props.Header}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.icon}>
              <Image style={styles.img} source={this.props.img} />
            </View>
            <TextInput
              {...this.props}
              style={styles.txtinput}
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
  container: {
    // backgroundColor: '#fff',
    width: '86%',
    height: h('7%'),
    borderRadius: h('1.5%'),
    flexDirection: 'row',

    borderBottomColor: '#0005',
    borderBottomWidth: h('0.2%'),
  },
  txtinput: {
    // backgroundColor: 'tomato',
    width: '85%',
    height: h('7%'),
    paddingLeft: h('1.5%'),
    color: 'black',
  },
  icon: {
    // backgroundColor: 'red',
    width: '15%',
    height: h('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  HeaderText: {
    // backgroundColor: 'red',
    width: '83%',
    height: h('2.8%'),
    justifyContent: 'center',
  },
  HeaderTextf: {
    color: '#0006',
    fontSize: h('2.2%'),
  },
  Topmargin: {
    marginTop: h('1.5%'),
  },
});
