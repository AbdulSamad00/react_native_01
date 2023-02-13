//import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from "react";
import AuthContext from "./src/auth/context";
import authStorage from "./src/auth/storage";
import { AuthNavigation } from "./src/navigation/AuthNavigation";
import { StackNavigation } from "./src/navigation/StackNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { proxy } from "valtio";
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import * as Sentry from 'sentry-expo';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

export const state = proxy({
  isTablet: false,
});



//export default function App() {
  const App = ()=>{
  
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const cachedUser = async () => {
    const user = await authStorage.getCurrentUser();
    if (user) setUser(user);
  };
  const getDeviceType = async () => {
    const device = await getDeviceTypeAsync();
    state.isTablet = device === DeviceType.TABLET ? true : false;
    console.log("device");
    console.log(state.isTablet);
  };

  Sentry.init({
    dsn: 'https://0e4e85c2923745b9ba04c3f7158ab954@o1130038.ingest.sentry.io/6179746',
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });

  
  
  // Access any @sentry/react-native exports via:
  //Sentry.Native.*
  
  // Access any @sentry/browser exports via:
  //Sentry.Browser.*


  SplashScreen.preventAutoHideAsync()
  .then(result => cachedUser)
  .catch(console.warn); // it's good to explicitly catch and inspect any error

  useEffect(() => {
    getDeviceType();
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    //throw new Error("My first Sentry error!");
    cachedUser();
  }, []);

  //MaazuHere

  if (!isReady) {
    //return (
      // <AppLoading
      //   startAsync={cachedUser}
      //   onFinish={() => setIsReady(true)}
      //   onError={console.warn}
      // />
      SplashScreen.hideAsync();

   // );
  }

  // return <KanbansScreen />;
  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user, setUser }}>
   
        {user ? <StackNavigation /> : <AuthNavigation />} 
      </AuthContext.Provider>
    </Provider>
  );
}

export default Sentry.Native.wrap(App);