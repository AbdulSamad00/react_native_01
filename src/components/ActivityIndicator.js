import React from 'react';
import { StyleSheet,View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
function ActivityIndicator({visible=false}) {
    if(!visible) return null;
    
    return (
    <View style={styles.overlay}>
    <LottieView
    autoPlay 
    loop
    style={{width:200,height:200, 
        alignContent: 'center',alignItems: 'center',paddingTop:"25%"}} 
    source={require('../assets/animations/loader.json')}
    />  
    </View>
    );
   
}
const styles = StyleSheet.create({
    overlay:{
        height:"100%",
        width:"100%",
        alignContent: 'center',
        alignItems: 'center',
        //justifyContent: 'center',
        flex:1,
        backgroundColor: "black",
        //backgroundColor: "white",
        position:"absolute",
        zIndex:1,
        opacity:0.8
    }
})
export default ActivityIndicator;