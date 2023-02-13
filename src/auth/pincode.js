import * as SecureStore from 'expo-secure-store';

const key = "pin_Key";
const savePincode = async (pinKey)=> {
    try {
       await SecureStore.setItemAsync(key, pinKey);  
    } catch (error) {
        console.log("No values stored under that key.",error);
    }
   
}
const getPincode = async ()=> {
   
    try {
        return await SecureStore.getItemAsync(key);
     } catch (error) {
         console.log("Error get Pincode",error);
     }
}




const deletePincode = async ()=> {
   
    try {
        await SecureStore.deleteItemAsync(key);
     } catch (error) {
         console.log("Error remove Pincode",error);
     }
}

export default{
    savePincode,
    deletePincode,
    getPincode
}