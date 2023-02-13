import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Navbar3, AppText, Appbtn} from '../../components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

export class Slot extends Component {
  state = {
    date: '',
    time: '',
    button: '',
    button2: '',
    button3: '',
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <Navbar3
            Plus={() => {
              this.props.navigation.navigate('Slot2');
            }}
            Text={'Slot'}
            bell={() => {
              this.props.navigation.navigate('Notifications');
            }}
          />
          {/* LOGIN SCREEN */}
          <View style={styles.topDateBox}>
            <Text style={styles.Texts}>Select Date</Text>
            <Text style={styles.Texts2}>August 2020</Text>
          </View>

          {/* calander */}
          <View style={styles.topDateBox2}>
            {this.state.date === 'Sun' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: ''});
                }}
                style={styles.DateBox3}>
                <Text style={styles.dateText4}>Sun</Text>
                <Text style={styles.dateText3}>15</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: 'Sun'});
                }}
                style={styles.DateBox}>
                <Text style={styles.dateText}>Sun</Text>
                <Text style={styles.dateText2}>15</Text>
              </TouchableOpacity>
            )}

            {this.state.date === 'Mon' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: ''});
                }}
                style={styles.DateBox3}>
                <Text style={styles.dateText4}>Mon</Text>
                <Text style={styles.dateText3}>2</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: 'Mon'});
                }}
                style={styles.DateBox}>
                <Text style={styles.dateText}>Mon</Text>
                <Text style={styles.dateText2}>2</Text>
              </TouchableOpacity>
            )}
            {this.state.date === 'Tue' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: ''});
                }}
                style={styles.DateBox3}>
                <Text style={styles.dateText4}>Tue</Text>
                <Text style={styles.dateText3}>3</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: 'Tue'});
                }}
                style={styles.DateBox}>
                <Text style={styles.dateText}>Tue</Text>
                <Text style={styles.dateText2}>3</Text>
              </TouchableOpacity>
            )}
            {this.state.date === 'wed' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: ''});
                }}
                style={styles.DateBox3}>
                <Text style={styles.dateText4}>Wed</Text>
                <Text style={styles.dateText3}>4</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: 'wed'});
                }}
                style={styles.DateBox}>
                <Text style={styles.dateText}>Wed</Text>
                <Text style={styles.dateText2}>4</Text>
              </TouchableOpacity>
            )}
            {this.state.date === 'thu' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: ''});
                }}
                style={styles.DateBox3}>
                <Text style={styles.dateText4}>Thu</Text>
                <Text style={styles.dateText3}>5</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: 'thu'});
                }}
                style={styles.DateBox}>
                <Text style={styles.dateText}>Thu</Text>
                <Text style={styles.dateText2}>5</Text>
              </TouchableOpacity>
            )}
            {this.state.date === 'fri' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: ''});
                }}
                style={styles.DateBox3}>
                <Text style={styles.dateText4}>Fri</Text>
                <Text style={styles.dateText3}>6</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: 'fri'});
                }}
                style={styles.DateBox}>
                <Text style={styles.dateText}>Fri</Text>
                <Text style={styles.dateText2}>6</Text>
              </TouchableOpacity>
            )}
            {this.state.date === 'sat' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: ''});
                }}
                style={styles.DateBox3}>
                <Text style={styles.dateText4}>Sat</Text>
                <Text style={styles.dateText3}>7</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({date: 'sat'});
                }}
                style={styles.DateBox}>
                <Text style={styles.dateText}>Sat</Text>
                <Text style={styles.dateText2}>7</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* calander */}

          {/* time slot */}
          <View style={styles.TopHeaderbox}>
            <Text style={styles.leftbox}>8 AM - 10 AM (15 mins)</Text>
            <View style={styles.IconContainer}>
              <TouchableOpacity style={styles.IconContainer}>
                <Image
                  style={styles.icons}
                  source={require('../../assets/e1.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.IconContainer}>
                <Image
                  style={styles.icons}
                  source={require('../../assets/dele.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.TimeSLot}>
            <View style={styles.lefts}>
              {/* BUTTON1 */}
              {this.state.time === '8:00 AM - 8:15 AM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>8:00 AM - 8:15 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '8:00 AM - 8:15 AM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>8:00 AM - 8:15 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '8:30 AM - 8:45 AM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>8:30 AM - 8:45 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '8:30 AM - 8:45 AM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>8:30 AM - 8:45 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '9:00 AM - 9:15 AM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>9:00 AM - 9:15 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '9:00 AM - 9:15 AM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>9:00 AM - 9:15 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '9:30 AM - 9:45 AM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>9:30 AM - 9:45 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '9:30 AM - 9:45 AM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>9:30 AM - 9:45 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '2:00 PM - 2:15 PM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>2:00 PM - 2:15 PM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '2:00 PM - 2:15 PM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>2:00 PM - 2:15 PM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
            </View>
            <View style={styles.Rights}>
              {/* BUTTON1 */}
              {this.state.time === '8:15 AM - 8:30 AM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>8:15 AM - 8:30 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '8:15 AM - 8:30 AM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>8:15 AM - 8:30 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '8:45 AM - 9:00 AM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>8:45 AM - 9:00 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '8:45 AM - 9:00 AM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>8:45 AM - 9:00 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '9:15 AM - 9:30 AM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>9:15 AM - 9:30 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '9:15 AM - 9:30 AM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>9:15 AM - 9:30 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '9:45 AM - 10:00 AM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>9:45 AM - 10:00 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '9:45 AM - 10:00 AM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>9:45 AM - 10:00 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '2:15 PM - 2:30 PM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>2:15 PM - 2:30 PM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '2:15 PM - 2:30 PM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>2:15 PM - 2:30 PM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
            </View>
          </View>
          {/* slot2 */}
          {/* time slot */}
          <View style={styles.TopHeaderbox}>
            <Text style={styles.leftbox}>1 PM - 3 PM (30 mins)</Text>
            <View style={styles.IconContainer}>
              <TouchableOpacity style={styles.IconContainer}>
                <Image
                  style={styles.icons}
                  source={require('../../assets/e1.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.IconContainer}>
                <Image
                  style={styles.icons}
                  source={require('../../assets/dele.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.TimeSLot, {height: h('20%')}]}>
            <View style={styles.lefts}>
              {/* BUTTON1 */}
              {this.state.time === '1:00 PM - 1:30 PM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>1:00 PM - 1:30 PM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '1:00 PM - 1:30 PM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>1:00 PM - 1:30 PM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '2:00 PM - 2:30 PM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>2:00 PM - 2:30 PM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '2:00 PM - 2:30 PM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>2:00 PM - 2:30 PM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
            </View>
            <View style={styles.Rights}>
              {/* BUTTON1 */}
              {this.state.time === '1:30 PM - 2:00 PM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>1:30 PM - 2:00 PM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '1:30 PM - 2:00 PM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>1:30 PM - 2:00 PM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === '2:30 PM - 3:00 PM' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: ''});
                  }}
                  style={styles.Timebox2}>
                  <Text style={styles.timezone2}>2:30 PM - 3:00 PM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({time: '2:30 PM - 3:00 PM'});
                  }}
                  style={styles.Timebox}>
                  <Text style={styles.timezone}>2:30 PM - 3:00 PM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
            </View>
          </View>

          {/* slot end */}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: h('110%'),
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  topDateBox: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('7%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: h('2%'),
    paddingRight: h('2%'),
  },
  topDateBox2: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('10%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  DateBox: {
    // backgroundColor: 'gold',
    width: '13.5%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: h('0.5%'),
  },
  DateBox3: {
    backgroundColor: '#003C75',
    width: '13.5%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: h('0.5%'),
  },
  dateText: {
    color: '#0007',
    fontSize: h('2%'),
  },
  dateText4: {
    color: '#ffff',
    fontSize: h('2%'),
  },

  dateText2: {
    color: '#000',
    fontSize: h('4%'),
  },
  dateText3: {
    color: '#fff',
    fontSize: h('4%'),
  },
  TimeSLot: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('43%'),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftbox: {
    fontSize: h('2.2%'),
    color: '#0007',
  },
  lefts: {
    // backgroundColor: 'gold',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Rights: {
    // backgroundColor: 'green',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Timebox: {
    backgroundColor: 'white',
    width: '90%',
    height: h('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: h('1%'),
    marginTop: h('1%'),
  },
  timezone: {
    color: '#0007',
    fontSize: h('2.2%'),
  },
  Timebox2: {
    backgroundColor: '#003C75',
    width: '90%',
    height: h('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: h('1%'),
    marginTop: h('1%'),
  },
  timezone2: {
    color: '#ffff',
    fontSize: h('2.2%'),
  },
  TopHeaderbox: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('7%'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: h('2%'),
    justifyContent: 'space-between',
  },
  IconContainer: {
    // backgroundColor: 'gold',
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icons: {
    width: '50%',
    height: '70%',
    resizeMode: 'contain',
  },
});
