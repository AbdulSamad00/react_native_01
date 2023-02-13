import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
 
export default class filterPicker extends React.Component {
    state = {
        selectectedItems: [],
        isShownPicker: false
    }
    multiSelect
 
    render() {
        const items = [
            { label: 'First Name', value: '1' },
            { label: 'Last Name', value: '2' },
            { label: 'Country', value: '3' },
            { label: 'City', value: '4' },
            { label: 'Age', value: '5' },
            { label: 'Profile', value: '6' },
        ]
        return (
         
          <View style={styles.container}>
            <View style={styles.containerBtn}>
        <Pressable style={styles.button} style={{
          backgroundColor: '#2f2', width: '20%', height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          elevation: 3,
        }} >
          <Text style={styles.text}>Active</Text>
        </Pressable>
        <Pressable style={styles.button} style={{
          backgroundColor: '#888', width: '20%', height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          elevation: 3,
        }} >
          <Text style={styles.text}>Archived</Text>
        </Pressable>
        <Pressable style={styles.button} style={{
          backgroundColor: '#f22', width: '20%', height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          elevation: 3,
        }}  >
          <Text style={styles.text}>Banned</Text>
        </Pressable>
        <Pressable style={styles.button} style={{
          backgroundColor: '#222', width: '20%', height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          elevation: 3,
        }} >
          <Text style={styles.text}>Deleted</Text>
        </Pressable>
        <Pressable style={styles.button} style={{
          backgroundColor: '#07f', width: '20%', height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          elevation: 3,
        }}>
          <Text style={styles.text}>All</Text>
        </Pressable>
      </View>

      <View  style={styles.containerFilter}>
              
              <TouchableOpacity 
                  onPress={() => {
                      this.setState({ isShownPicker: !this.state.isShownPicker })
                  }}
                  style={{ height: 30, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadde3' }}
              >
                  <Text>Filter Options</Text>
              </TouchableOpacity>
              {this.state.isShownPicker ? <MultipleSelectPicker   style={styles.optionsList}
                  items={items}
                  onSelectionsChange={(ele) => { this.setState({ selectectedItems: ele }) }}
                  selectedItems={this.state.selectectedItems}
                  buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                  buttonText='hello'
                  checkboxStyle={{ height: 20, width: 20 }}
              />
                  : null
              }
          </View >
         
            </View>
                      
                  
        )
    }
}

const styles = StyleSheet.create({
  
  container: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5
  },
  containerBtn: {
    width: '45%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "row",


  },
  picker: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  text: {
    fontSize: 7,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',

  },
  containerFilter: {
    width: 150,
    height: 200,
    marginTop: 170,
  },
  optionsList: {
    height: 300,
    width: '100%',
  },
})