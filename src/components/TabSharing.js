import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { TextInput, Button, Pressable, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements';

export default function TabSharing() {
  var radio_props = {
    data: ['Only users listed in access control list have access', 'Publish over the world', 'Access by having link for everyone'],

  };
  console.log(radio_props)
  const [checke, setChecke] = useState(0);
  const [text, setText] = useState(null);
  const [checked, onChange] = useState(false);
  const [checkedComment, toggleCheckedComment] = useState(false);
  const [checkedView, toggleCheckedView] = useState(false);
  const [checkedEdit, toggleCheckedEdit] = useState(false);
  return (


    <View style={styles.container}>
      <View style={styles.containerNav}>
        <View style={styles.containerNavCenter}>
          <Ionicons name="arrow-back" size={30} style={styles.icon} color='white' />
          <Text style={styles.text}>
            Ticket Name
          </Text>
        </View>
      </View>
      <View style={styles.shareTillContainer}>
        <View style={styles.shareTill}>
          <Text style={styles.text}>
            Share till
          </Text>
        </View>
        <View style={styles.sendInvitationContainer}>
          <Text style={styles.text}>
            Send invitation
          </Text>
        </View>
        <View style={{
          width: '80%', padding: 8, marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#333300',
        }} >
          <Text style={styles.text}>
            Access control list
          </Text>
        </View>
      </View>



      <View style={styles.inputscontainer}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="User"
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.input}
          value={text}
          placeholder="email"
          placeholderTextColor='white'
        />


        <View style={styles.checkboxRow}  >

          <CheckBox
            title="comment"
            checked={checkedComment}
            onPress={() => toggleCheckedComment(!checkedComment)}
            containerStyle={{ width: '30%', backgroundColor: 'transparent', borderColor: 'transparent' }}
          />
          <CheckBox
            title="edit"
            checked={checkedEdit}
            onPress={() => toggleCheckedEdit(!checkedEdit)}
            containerStyle={{ width: '30%', backgroundColor: 'transparent', borderColor: 'transparent' }}
          />
          <CheckBox
            title="view"
            checked={checkedView}
            onPress={() => toggleCheckedView(!checkedView)}
            containerStyle={{ width: '30%', backgroundColor: 'transparent', borderColor: 'transparent' }}
          />
        </View>


        <View style={styles.checkboxRow}   >
          <Pressable style={styles.button1}  >
            <Text style={styles.text}>Share till</Text>
          </Pressable>
          <Pressable style={styles.button2}  >
            <Text style={styles.text}>Delete</Text>
          </Pressable>
          <Pressable style={styles.button3}     >
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </View>
      </View>


      <View style={styles.option}>
        <Text style={styles.text}>
          Publicity  </Text>
      </View>

      <View style={styles.radiobuttonsRow}  >
        {
          radio_props.data.map((data, key) => {
            return (
              <View   >
                {checke == key ?
                  <TouchableOpacity style={styles.radio}>
                    <Ionicons name="radio-button-on" size={30} style={styles.icon} color='black' />

                    <Text >{data}</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity style={styles.radio} onPress={() => setChecke(key)}>
                    <Ionicons name="radio-button-off" size={30} style={styles.icon} color='black' />

                    <Text   >{data}</Text>
                  </TouchableOpacity>
                }
              </View>

            )
          })
        }


      </View>

      <View style={styles.option} >
        <Text style={styles.text}>
          Settings  </Text>
      </View>

    </View>


  );
}

const styles = StyleSheet.create({
  radiobutton: {
    height: 50,
    width: 200,

  },
  radio: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  img: {
    height: 20,
    width: 20,
    marginLeft: 20,
    backgroundColor: 'red',
  },
  radiobuttonsRow: {
    width: '100%',


    marginTop: 10,
    justifyContent: 'space-evenly',
    paddingLeft: 10,
    paddingRight: 10,
  },
  checkboxRow: {
    width: '100%',

    marginTop: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10
  },
  checkboxRowContainer: {
    width: '22%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  container: {

    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
    width: '100%',


  },

  containerNav: {
    backgroundColor: '#00bfff',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerNavCenter: {
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  shareTillContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,



  },
  shareTill: {
    width: '40%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#333300',
    borderColor: 'transparent',
    padding: 8,
  },
  sendInvitationContainer: {
    width: '70%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00bfff',
    borderRadius: 20,
    padding: 8,



  },
  sendInvitation: {
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#00bfff',
    borderColor: 'transparent',
  },
  options: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00bfff',

  },
  option: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: 'transparent',
    backgroundColor: '#333300',

  },
  inputscontainer: {
    width: '100%',


  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: '#BDC3C7',
    color: 'white',
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#333300'
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#ff4d4d'
  },
  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#53c68c'
  },
});