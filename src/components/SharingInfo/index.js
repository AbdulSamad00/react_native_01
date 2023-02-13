import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Picker, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DatePickerFuture from '../DatePickerFuture';

const SharingInfo = () => {
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([
    'test1 test1',
    'test2 test2',
    'test3 test3',
    'test4 test4',
  ]);
  const [view, setView] = useState(false);
  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Email :</Text>
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        <Text style={styles.label}>User Name :</Text>
        <Picker style={styles.picker}>
          {users.map((user) => (
            <Picker.Item label={user} value={user} />
          ))}
        </Picker>
        <Text style={styles.label}>Rights & permissions</Text>
        <View style={styles.checkboxes}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={view}
              onValueChange={setView}
              style={styles.checkbox}
            />
            <Text style={styles.label}>View</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={comment}
              onValueChange={setComment}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Comment</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={edit}
              onValueChange={setEdit}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Edit</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShow(!show)} style={styles.date}>
            <Text style={styles.dateText}>Share Till</Text>
        </TouchableOpacity>
        {show && (
            <DatePickerFuture
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display="default"
                onChange={(e, selectedDate) => {
                const currentDate = selectedDate || date;
                setShow(Platform.OS === 'ios');
                setDate(currentDate);
                }}
            />
        )}
    </View>
  );
};

export default SharingInfo;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 30,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 30,
        paddingLeft: 10,
    },
    picker: {
        width: '80%',
        height: 40,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 30,
    },
    checkboxes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        alignSelf: "center",
    },
    checkboxContainer: {
        display: "flex",
        flexDirection: 'row',
        width: '25%',
        alignItems: "center",
    },
    checkbox: {
        marginRight: 10,
    },
    date: {
        marginTop: 20,
        width: '30%',
        height: 40,
        backgroundColor: 'black',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
    dateText: {
        color: "white",
    },
});
