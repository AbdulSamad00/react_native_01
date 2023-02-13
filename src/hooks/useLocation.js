import {useEffect,useState} from "react";
import * as Location from 'expo-location';
export default useLocation = () =>{
    const [location,setLocation] = useState();
    const getLocation = async ()=>{
        try {
            //const {granted} = await Location.requestPermissionsAsync();
            const { status } = await Location.getBackgroundPermissionsAsync();
            if(!status) return;
            const {coords:{longitude,latitude}} = await Location.getLastKnownPositionAsync();
            //const result = await Location.getCurrentPositionAsync();
            setLocation({latitude,longitude});    
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getLocation();
    },[]);
    return location;
};
