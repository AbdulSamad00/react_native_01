import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
// data is the data for chart from database
import data from '../../../fishbone.json';
const FishboneChartComponent = () => {
    // this arrange data in upper and lower level
    const upperData = data.filter((item, index) => index % 2 === 0);
    const lowerData = data.filter((item, index) => index % 2 !== 0);
  
    return (
      <View style={styles.Container}>
        <View style={styles.chartContainer}>
          {upperData.map((data, index) => {
            const { categories } = data;
            return (
              <View key={index} style={styles.singleData}>
                <View style={{ position: 'relative' }}>
                  <Text
                    style={[
                      styles.fishTitle,
                      {
                        backgroundColor: data.color,
                        color:
                          parseInt(data.color.replace('#', ''), 16) >
                          0xffffff / 1.1
                            ? 'black'
                            : 'white',
                      },
                    ]}
                  >
                    {data.rootCauses}
                  </Text>
                  <View style={styles.upperArrow}></View>
                </View>
  
                <View style={[styles.fishcategoriesLower]}>
                  {categories.map((category, index) => (
                    <Text key={index} style={{ fontSize: 7, textAlign: 'right' }}>
                      {category}
                    </Text>
                  ))}
                </View>
              </View>
            );
          })}
          <View style={styles.underline}></View>
          {lowerData.map((data, index) => {
            const { categories } = data;
            return (
              <View key={index} style={styles.singleData}>
                <View style={[styles.fishcategoriesLower]}>
                  {categories.map((category, index) => (
                    <Text key={index} style={{ fontSize: 7, textAlign: 'right' }}>
                      {category}
                    </Text>
                  ))}
                </View>
                <View>
                  <View style={styles.lowerArrow}></View>
                  <Text
                    style={[
                      styles.fishTitle,
                      {
                        backgroundColor: data.color,
                        color:
                          parseInt(data.color.replace('#', ''), 16) >
                          0xffffff / 1.1
                            ? 'black'
                            : 'white',
                      },
                    ]}
                  >
                    {data.rootCauses}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.rightPart}>
          <View style={styles.verticalLine}></View>
          <Text style={[styles.rightText]}>Bad Coffee 1</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // marginTop: 50,
      marginRight: 100,
      alignItems: 'center',
      transform: [{ rotate: '90deg' }],
      alignContent: 'center',
      justifyContent: 'flex-start',
      textAlign: 'center',
      width: data.length / 2 < 3 ? '100%' : data.length / 2 < 4 ? '150%' : '200%',
      // minWidth: 'fit-content',
      marginLeft: data.length / 2 < 3 ? 0 : data.length / 2 < 4 ? -100 : -195,
      marginTop: 250,
      marginBottom: 180,
    },
    chartContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 150,
    },
    singleData: {
      flexDirection: 'column',
      maxWidth: '30%',
      marginHorizontal: 5,
    },
    fishTitle: {
      fontSize: 10,
      // width: 90,
      // minWidth: 85,
      width: 100,
      padding: 5,
      marginHorizontal: 10,
      backgroundColor: 'blue',
      textAlign: 'center',
      borderRadius: 6,
    },
    fishcategoriesUpper: {
      fontSize: 8,
      textAlign: 'center',
      height: 50,
      width: 80,
      paddingTop: 5,
    },
    fishcategoriesLower: {
      fontSize: 8,
      textAlign: 'center',
      height: 50,
      width: 80,
      marginLeft: 10,
      paddingTop: 5,
    },
    underline: {
      width: '100%',
      height: 2,
      marginVertical: 10,
      backgroundColor: 'lightgreen',
    },
    upperArrow: {
      position: 'absolute',
      height: 2,
      width: 74,
      transform: [{ rotate: '60deg' }],
      top: 53,
      left: 90,
      backgroundColor: 'lightgreen',
    },
    lowerArrow: {
      position: 'absolute',
      height: 2,
      width: 74,
      transform: [{ rotate: '120deg' }],
      top: -30,
      left: 90,
      backgroundColor: 'lightgreen',
    },
    rightPart: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '10%',
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.5,
    },
    rightText: {
      fontSize: 8,
      maxWidth: 100,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    verticalLine: {
      height: 150,
      width: 2,
      // transform: [{ rotate: '90deg' }],
      backgroundColor: 'green',
    },
  });
  
  export default FishboneChartComponent;