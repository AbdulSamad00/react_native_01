import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Navbar2, AppText2, Appbtn} from '../../components';
import {w, h} from 'react-native-responsiveness';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
export class AddPatient extends Component {
  state = {City: '', gender: ''};
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <Navbar2
            arrow={() => {
              this.props.navigation.goBack();
            }}
            Text={'Add a Patient'}
          />

          <View style={styles.loginScreen}>
            <View style={styles.TextinputFields}>
              <AppText2 Header={'PATIENT NAME'} placeholder={'Sam Alex'} />
              <View style={styles.twoFields}>
                <View style={styles.leftFields}>
                  <AppText2
                    Header={'DATE OF BIRTH'}
                    placeholder={'Feb 15, 1980'}
                  />
                </View>
                <View style={styles.RightFields}>
                  <AppText2 Header={'PATIENT AGE (YEARS)'} placeholder={'40'} />
                </View>
              </View>
              <View style={styles.Gender}>
                <View style={styles.GenderText}>
                  <Text style={styles.gendertextcss}>GENDER</Text>
                </View>
                <View style={styles.img}>
                  {this.state.gender === 'Male' ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({gender: ''});
                      }}
                      style={styles.genderButton}>
                      <Image
                        style={styles.icons}
                        source={require('../../assets/m2.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({gender: 'Male'});
                      }}
                      style={styles.genderButton}>
                      <Image
                        style={styles.icons}
                        source={require('../../assets/m1.png')}
                      />
                    </TouchableOpacity>
                  )}
                  {this.state.gender === 'Female' ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({gender: ''});
                      }}
                      style={styles.genderButton}>
                      <Image
                        style={styles.icons}
                        source={require('../../assets/f2.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({gender: 'Female'});
                      }}
                      style={styles.genderButton}>
                      <Image
                        style={styles.icons}
                        source={require('../../assets/f1.png')}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity style={styles.uploadContainer}>
                  <View style={styles.leftContainer}>
                    <Image
                      style={styles.icons}
                      source={require('../../assets/u.png')}
                    />
                  </View>
                  <View style={styles.RightContainer}>
                    <Text style={styles.Uploadtext}>Upload File</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.submitbuttonContainer}>
                  <Appbtn txt={'SAVE'} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: h('120%'),
    backgroundColor: '#F6F6F6',
  },
  sideImge: {
    backgroundColor: '#003C75',
    width: '50%',
    height: h('15%'),
    marginTop: h('2%'),
    borderBottomRightRadius: h('10%'),
    borderTopRightRadius: h('10%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imgeContainer: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  loginScreen: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('60%'),
    marginTop: h('2%'),
  },
  headingText: {
    fontSize: h('3.8%'),
    color: 'black',
    marginLeft: h('2.2%'),
    marginTop: h('2%'),
  },
  headingText2: {
    color: '#0007',
    fontSize: h('2%'),
    marginLeft: h('2.2%'),
  },
  TextinputFields: {
    width: '100%',
    height: h('76%'),

    alignItems: 'center',
    marginTop: h('3%'),
    // backgroundColor: 'red',
  },
  Forgotbutton: {
    marginTop: h('2%'),
  },
  ForgotbuttonText: {
    color: '#0007',
    fontSize: h('2.2%'),
    marginLeft: h('2%'),
  },
  RegisterScreen: {
    width: '100%',
    height: h('11%'),
    alignItems: 'center',
    // backgroundColor: 'green',
    marginTop: h('28%'),
  },
  Register: {
    width: '42%',
    height: h('6%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RegisterText: {
    color: 'black',
    fontSize: h('2%'),
    fontWeight: 'bold',
  },
  DoctorText: {
    color: 'black',
    fontSize: h('2%'),
  },
  picker: {
    // backgroundColor: 'green',
    width: '99%',

    borderBottomColor: 'black',
    borderBottomWidth: h('1%'),
  },
  container22: {
    // backgroundColor: '#fff',
    width: '89%',
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

  img22: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  HeaderText: {
    // backgroundColor: 'red',
    width: '83%',
    height: h('2.8%'),
    justifyContent: 'center',
    marginLeft: h('1%'),
  },
  HeaderTextf: {
    color: '#0006',
    fontSize: h('2.2%'),
  },
  Topmargin: {
    marginTop: h('4%'),
  },
  twoFields: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('15%'),
    marginTop: h('2%'),
    flexDirection: 'row',
  },
  leftFields: {
    // backgroundColor: 'green',
    width: '50%',
    height: h('15%'),
    paddingLeft: h('2%'),
    paddingRight: h('2%'),
  },
  RightFields: {
    // backgroundColor: 'gold',
    width: '50%',
    height: h('15%'),
    paddingLeft: h('2%'),
    paddingRight: h('2%'),
  },
  Gender: {
    // backgroundColor: 'red',
    width: '90%',
    height: h('20%'),
    marginTop: h('2%'),
  },
  icons: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  img: {
    // backgroundColor: 'gold',
    width: '100%',
    height: h('15%'),
    flexDirection: 'row',
  },
  GenderText: {
    // backgroundColor: 'green',
    width: '100%',
    height: h('3%'),
    flexDirection: 'row',
  },
  gendertextcss: {
    color: '#0006',
    fontSize: h('2.2%'),
  },
  genderButton: {
    // backgroundColor: 'green',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: h('10%'),
    flexDirection: 'row',
    borderRadius: h('1%'),
    marginTop: h('2%'),
  },
  leftContainer: {
    // backgroundColor: 'gold',
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RightContainer: {
    // backgroundColor: 'green',
    width: '80%',
    height: '100%',
    paddingLeft: h('2%'),
    justifyContent: 'center',
  },
  Uploadtext: {
    color: '#000',
    fontSize: h('3%'),
  },
  submitbuttonContainer: {
    // backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: h('3%'),
  },
});
