import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = "authToken";
const saveToken = async (authToken)=> {
    try {
       await SecureStore.setItemAsync(key, authToken);  
    } catch (error) {
        console.log("No values stored under that key.",error);
    }
   
}
const getToken = async ()=> {
   
    try {
        return await SecureStore.getItemAsync(key);
     } catch (error) {
         console.log("Error get token",error);
     }
}

const getCurrentUser = async ()=>{
    const token = await getToken();
    return (token)? jwtDecode(token):null;
} 


const deleteToken = async ()=> {
   
    try {
        await SecureStore.deleteItemAsync(key);
     } catch (error) {
         console.log("Error remove token",error);
     }
}

export default{
    saveToken,
    deleteToken,
    getCurrentUser,
    getToken
}