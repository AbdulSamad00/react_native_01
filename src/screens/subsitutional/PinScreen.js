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
  TextInput
} from 'react-native'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
//import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AuthContext from '../../auth/context';
import PinKey from '../../auth/pincode';
import authStorage from '../../auth/storage';
import { Navbar, AppText, Appbtn } from "../../components";

const {width,height} = Dimensions.get("window");

const numbers = [1,2,3,4,5,6,7,8,9,0];

const PinScreen = (props) => {
const [Repeat,setRepeat]=useState(false)
const [loading, setLoading] = useState(true);
const authContext = useContext(AuthContext);
const [passcode, setPassCode] = useState(["","","","",""]);
//const [code, setCode] = useState([...Array(5)].map(x => ""));
const [pinStatus,setPinStatus] = useState(false);
const [message,setMessage] = useState("Enter a passcode");
const [repeatPin,setRepeatPin] = useState("");
//const {params}=props.route;
const [error,setError]=useState('');

const [pin1,setPin1] = useState("");
const [pin2,setPin2] = useState("");
const [pin3,setPin3] = useState("");
const [pin4,setPin4] = useState("");
const [pin5,setPin5] = useState("");

const pin1Ref = useRef();
const pin2Ref = useRef();
const pin3Ref = useRef();
const pin4Ref = useRef();
const pin5Ref = useRef();

/* const list = [...Array(5).keys()];
const inputRef = useRef([]);

const handler = idx => e => {
  const next = inputRef.current[idx + 1];
  if (next) {
    next.focus()
  }
}; */
useEffect(()=>{ 
  //lockOrientation();
  pincodeStatus();
},[])



const onNumPress = async(num)=>{
  
  //console.log("num",num);
  //if(passcode.length === 5) return;
  let code = [...passcode];
  for(let i=0;i<code.length;i++){
    if(code[i] === ""){
      code[i] = num;
      break;
    }else{
      continue;
    }
  }
  setPassCode(code);
  if(code.length === 5) {
    //console.log("length ===5 ");
    if(pinStatus) {
      //console.log("pinStatus",pinStatus);
         try {
            const value = await PinKey.getPincode();
            if(code.join('') == value) {
              props.navigation.navigate('TabNavigation')
            }
            else{
             setError("Wrong Pin Code")
             //setMessage("Wrong Pin Code")
            }
          } catch(e) {
            console.log(e);
          }
    }
    
  }
}

const onDelete = ()=>{
  console.log("delete");
  let code = [...passcode];
  for(let i=code.length-1;i>=0;i--){
    if(code[i] !== ""){
      code[i] = "";
      break;
    }else{
      continue;
    }
  }
  setPassCode(code);
  console.log("code:",code);
}



const handleSubmit = async()=>{
  const value = [pin1,pin2,pin3,pin4,pin5];
  const pin = value.join("");
  if(pin.length != 5) return;
  await PinKey.savePincode(pin);
  props.navigation.navigate('TabNavigation')
}



// const lockOrientation = async () => {
//   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
// }

const pincodeStatus=async()=>{
  const pin = await PinKey.getPincode();
  console.log("pinStatus",pin);
  //if(pin) setRepeat(true);
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
    props.navigation.navigate('SplashScreen')
}








  const getValue= async()=>{
  try {
    // setRepeat(true)
    //
    console.log(value);
    if(value.length<5){
      setError('Minimum Pin Length is 5')
    return
    }
    if(pinStatus) {
      console.log("pinStatus",pinStatus);
    
         try {
            const value1 = await PinKey.getPincode();
            if(value1 == value) {
              props.navigation.navigate('TabNavigation')
            }
            else{
      setError("Wrong Pin Code")
            }
          } catch(e) {
            console.log(e);
          }
    }else{
      console.log("Repeat",Repeat);
      if(!Repeat){
        setRepeat(true);
        setRepeatPin(value);
        setValue("");
        setMessage("please enter pincode again");
        return;
      }
      

        if(repeatPin == value) {
           await PinKey.savePincode(value);
          props.navigation.navigate('TabNavigation')
        }else{
  setError("Wrong Pin Code")
        }
   
     
    }
    
    
  } catch (e) {
    // saving error
    console.log(e);
  }
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
        <TextInput
          maxLength={1}
          style={[styles.TextInput]}
          keyboardType={"number-pad"}
          secureTextEntry={true}
          ref={pin1Ref}
          value={pin1}
       onChangeText={(pin1) => {
            setPin1(pin1);
            if (pin1 !== "") {
              pin2Ref.current.focus();
            }
          }} 
        
        />
        <TextInput
          maxLength={1}
          style={styles.TextInput}
          keyboardType={"number-pad"}
          secureTextEntry={true}
          ref={pin2Ref}
          value={pin2}
          onChangeText={(pin2) => {
            setPin2(pin2);
            if (pin2 !== "") {
              pin3Ref.current.focus();
            }
          }} 
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              pin1Ref.current.focus()
            }
          }}
        />
        <TextInput
          maxLength={1}
          style={styles.TextInput}
          keyboardType={"number-pad"}
          secureTextEntry={true}
          ref={pin3Ref}
          value={pin3}
          onChangeText={(pin3) => {
            setPin3(pin3);
            if (pin3 !== "") {
              pin4Ref.current.focus();
            }
          }} 
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              pin2Ref.current.focus()
            }
          }}
        />
        <TextInput
          maxLength={1}
          style={styles.TextInput}
          keyboardType={"number-pad"}
          secureTextEntry={true}
          value={pin4}
          ref={pin4Ref}
          onChangeText={(pin4) => {
            setPin4(pin4);
            if (pin4 !== "") {
              pin5Ref.current.focus();
            }
          }} 
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              pin3Ref.current.focus()
            }
          }}
        />
          <TextInput
          maxLength={1}
          style={styles.TextInput}
          keyboardType={"number-pad"}
          secureTextEntry={true}
          value={pin5}
          ref={pin5Ref}
          onChangeText={(pin5) => {
            setPin5(pin5);
          }} 
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              pin4Ref.current.focus()
            }
          }}
        />
      </View>
      <Appbtn
        onPress={handleSubmit}
        txt={"Submit"}
      />
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