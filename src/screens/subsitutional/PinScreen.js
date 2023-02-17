import React, { useState,useContext, useEffect,useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AuthContext from '../../auth/context';
import PinKey from '../../auth/pincode';
import authStorage from '../../auth/storage';
const {width,height} = Dimensions.get("window");

const numbers = [1,2,3,4,5,6,7,8,9,0];
const MAX_PASSCODE_LENGTH = 5;

const PinScreen = (props) => {
const [Repeat,setRepeat]=useState(false);
const [loading, setLoading] = useState(true);
const authContext = useContext(AuthContext);
//const [passcode, setPassCode] = useState(["","","","",""]);
const [passcode, setPassCode] = useState(new Array(MAX_PASSCODE_LENGTH).fill(''));
const [pinStatus,setPinStatus] = useState(false);
const [message,setMessage] = useState("Enter a passcode");
const [repeatPin,setRepeatPin] = useState("");
const [error,setError]=useState('');

const [pin, setPin] = useState(['', '', '', '', '']);
const inputRefs = useRef([null, null, null, null, null]);

const passcodeStack = useRef([]);

useEffect(()=>{ 
  if (inputRefs.current[0]) inputRefs.current[0].focus();
  pincodeStatus();

},[])

// const onNumPress = async(num)=>{
//   setError("");
//   setMessage("");
//   let code = [...passcode];
//   for(let i=0;i<code.length;i++){
//     if(code[i] === ""){
//       code[i] = num;
//       break;
//     }else{
//       continue;
//     }
//   }
//   setPassCode(code);
//   if(code.length === 5) {
//     if(pinStatus) {
//          try {
//             const value = await PinKey.getPincode();
//             if(code.join('') == value) {
//               props.navigation.navigate('TabNavigation')
//             }
//             else{
//              setError("Wrong Pin Code");
//              setMessage("Wrong Pin Code");
//             }
//           } catch(e) {
//             console.log(e);
//           }
//     }
    
//   }
// }

// const onDelete = ()=>{
//   setError("");
//   setMessage("");
//   console.log("delete");
//   let code = [...passcode];
//   for(let i=code.length-1;i>=0;i--){
//     if(code[i] !== ""){
//       code[i] = "";
//       break;
//     }else{
//       continue;
//     }
//   }
//   setPassCode(code);
//   console.log("code:",code);
// }


const onNumPress = async (num) => {
  setError('');
  setMessage('');

  if (passcodeStack.current.length < MAX_PASSCODE_LENGTH) {
    passcodeStack.current.push(num);
    setPassCode([...passcodeStack.current, ...new Array(MAX_PASSCODE_LENGTH - passcodeStack.current.length).fill('')]);

    if (passcodeStack.current.length === MAX_PASSCODE_LENGTH) {
      try {
        const value = await PinKey.getPincode();
        if (passcodeStack.current.join('') === value) {
          props.navigation.navigate('TabNavigation');
        } else {
          setError('Wrong Pin Code');
          setMessage('Wrong Pin Code');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};

const onDelete = () => {
  setError('');
  setMessage('');
  console.log('delete');

  if (passcodeStack.current.length > 0) {
    passcodeStack.current.pop();
    setPassCode([...passcodeStack.current, ...new Array(MAX_PASSCODE_LENGTH - passcodeStack.current.length).fill('')]);
  }
};

const handleSubmit = async(index, value)=>{
  const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value !== '' && index < 4) {
      inputRefs.current[index + 1].focus();
    }
    if (newPin.join('').length === 5) {
        await PinKey.savePincode(newPin.join(''));
        props.navigation.navigate('TabNavigation')
    }
  
};




const pincodeStatus=async()=>{
  const pin = await PinKey.getPincode();
  console.log("pinStatus",pin);
  if(pin) {
    setPinStatus(true);
    //setMessage("Type Your Pin to login");
  }

  setLoading(false);

}






// here is logout function
const  handleLogout=async()=>{
  //await AsyncStorage.removeItem('@pin_Key');
  await PinKey.deletePincode();
  let { setUser } = authContext;
    setUser(null);
    authStorage.deleteToken();
    props.navigation.navigate('AuthNavigation', { screen: 'Login' });
    
}

if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

  

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={require("./../../assets/background.jpg")}
        style={{
            position:"absolute",
            top: 0,
            width:width,
            height:height
        }}
        blurRadius={40}
        />
  


      {pinStatus?
     <>
      <View style={styles.swipe}>
            <View style={{flexDirection:'row'}}>
                <Image
                source={require("./../../assets/lock.png")}
                style={{width:15,height:20,marginRight:8}}
                />
                <Text style={styles.swipeUpText}>Swipe up to unlock</Text>
            </View>
            <View style={{marginTop:60}}>
              <View>
                <Text style={styles.passcodeText}>{message}</Text>   
              </View>
             <View style={styles.codeContainer}>
             
             {passcode.map((el,i) =>{
                if(el.toString()=== "") return <View style={styles.code} key={i}></View>;
                return <View style={styles.codef} key={i}></View>;
             })}                
             </View>

            </View>
        </View> 
     <View style={{alignItems:"center",justifyContent:"center"}}>
         <View style={styles.numbersContainer}>
           
            {numbers.map(num => {
              return (  <TouchableOpacity
              style={styles.number}
               key={num}
               onPress={()=>onNumPress(num)}
               >
                <Text style={styles.numberText}>{num}</Text>
             </TouchableOpacity> );
            })

            }

         </View>
     </View>

    <View style={styles.buttons}>
        <View>
        <TouchableOpacity
            onPress={()=>handleLogout()}
          >
          <MaterialIcons name="logout" size={30} color={"#FFFFFF"} />
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity
            onPress={()=>onDelete()}
          >
          <MaterialIcons name="backspace" size={30} color={"#003c75"} />
        </TouchableOpacity>
        </View>
    </View>
  
  
    </>  
    :
    <View style={styles.pinContainer}>
    <Text style={styles.headingText}>Enter a pincode</Text>
    <Text style={styles.headingText2}>
      A 5 - digit code is required for login next time
    </Text>

    <Text style={styles.headingText2}>
    {error}
    </Text>

    <View style={styles.TextinputFields}>
      <View style={styles.TextinputContainer}>
      {pin.map((value, index) => (
        <TextInput
          key={index}
          maxLength={1}
          style={[styles.TextInput]}
          keyboardType={"number-pad"}
          secureTextEntry={true}
          value={value}
          onChangeText={(value) => handleSubmit(index, value)}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
        ))}

      </View>
      {/* <Appbtn
        onPress={handleSubmit}
        txt={"Submit"}
      /> */}
    </View>
  </View>
    }
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    },
    swipe:{
        height:190,
        alignItems: "center",
        justifyContent: "center"
    },
    codeContainer:{
        flexDirection:"row",
        alignItems: "center",
        // justifyContent: "space-around",
        justifyContent: "space-between",
        marginTop:12
    },
    code:{
      width:15,
      height:15,
      borderRadius:15,
      borderWidth:1,
      borderColor: "#FFFFFF"
    },
    codef:{
      width:15,
      height:15,
      borderRadius:15,
      backgroundColor: "#FFFFFF"
    },
    swipeUpText:{
        //fontFamily: 'Cochin',
        fontSize:17,
        color: '#FFFFFF',
        letterSpacing:-0.4,
        lineHeight:20
    },
    passcodeText:{
        //fontFamily: 'Cochin',
        fontSize:20,
        color: '#FFFFFF',
        letterSpacing:-0.4,
        lineHeight:20
    },
    numbersContainer:{
        flexDirection:"row",
        flexWrap:"wrap",
        width:290,
        height:325,
        marginTop:30,
        alignItems:"center",
        justifyContent:"center"
    },
    number:{
        width:70,
        height:70,
        margin:10,
        borderRadius:70,
        backgroundColor: "rgba(255,255,255,0.1)",
        justifyContent:"center",
        alignItems:"center"
    },
    numberText:{
        //fontFamily:"Cohin",
        fontSize:32,
        color:"#FFFFFF",
        letterSpacing:0,
        textAlign:"center"
    },
    buttons:{
      marginTop:50,
      marginLeft: 60,
      marginRight:60,
      justifyContent:"space-between",
      alignItems: "center",
      flexDirection:"row"
    },
    /* second */ 
    pinContainer:{
      marginTop:50,
     // marginLeft: 20,
      //marginRight:20,
    },
    headingText:{
      fontSize:20,
      color: '#FFFFFF',
      letterSpacing:-0.4,
      lineHeight:24,
      marginLeft: 20,
      marginRight:20,
    },
    headingText2:{
      fontSize:20,
      color: '#FFFFFF',
      letterSpacing:-0.4,
      lineHeight:20,
      marginLeft: 20,
      marginRight:20,
      marginTop:15,
    },
    TextinputFields: {
      width: "100%",
      height: "80%",
      //backgroundColor: "#FFFFFF",
      alignItems: "center",
      marginTop: 40,
    },
    TextInput: {
      // backgroundColor: "red",
      width: 50,
      height: 70,
      paddingLeft: 8,
      paddingRight: 8,
      fontSize: 25,
      fontWeight: "bold",
      borderBottomColor: "#00B7DD",
      borderBottomWidth: 2,
      //color: "#00B7DD",
      color: "#FFFFFF",
    },
    TextinputContainer: {
      // backgroundColor: "green",
      width: "100%",
      height: "15%",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
    },
  });
  

export default PinScreen