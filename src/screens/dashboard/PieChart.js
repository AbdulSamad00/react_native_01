import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PieChartComponent from './../../components/PieChart';
import pieData from '../../../pie-chart-data.json';
const PieChart = () => {


  return (
    <ScrollView>
    <PieChartComponent data={pieData}/>
  </ScrollView>
  );
};

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
    color: 'black',
  },
  phoneNumberView: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '80%',
    padding: 8,
    backgroundColor: '#00B8D4',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    // backgroundColor: '#000',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: '100%',
  },
});

export default PieChart;