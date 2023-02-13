import { Platform } from 'react-native';

import colors from './colors';

export default {
    colors,
    text:{
        fontSize:18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "System",
        color:colors.black,
    },
    fonts: {
            FONT_REGULAR: Platform.OS === "android" ? 'Roboto-Regular':"System",
            FONT_MEDIUM: Platform.OS === "android" ? 'Roboto-Medium':"System",
            FONT_LIGHT: Platform.OS === "android" ? 'Roboto-Light':"System",
            FONT_THIN: Platform.OS === "android" ? 'Roboto-Thin':"System"
     }
   
    
   
}