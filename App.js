import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import authStorage from './src/auth/storage';
import AuthContext from './src/auth/context';
import { AuthNavigation } from './src/navigation/AuthNavigation';
import { StackNavigation } from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import * as SplashScreen from 'expo-splash-screen';
import { proxy } from "valtio";
import { DeviceType, getDeviceTypeAsync } from "expo-device";

import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
//import Sentry from './Sentry';
import * as Sentry from 'sentry-expo';

export const state = proxy({
    isTablet: false,
  });
  

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  Sentry.init({
    dsn: 'https://0e4e85c2923745b9ba04c3f7158ab954@o1130038.ingest.sentry.io/6179746',
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    //enableNative: true,
    //release: 'sentryMap',
    //dist: `${Updates.platform}-update-${Updates.manifest.id}`,
  });

  const cachedUser = async () => {
    const user = await authStorage.getCurrentUser();
    if (user) setUser(user);
    setLoading(false);
  };

  const getDeviceType = async () => {
    const device = await getDeviceTypeAsync();
    state.isTablet = device === DeviceType.TABLET ? true : false;
    console.log("device");
    console.log(state.isTablet);
  };


  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        cachedUser();
        getDeviceType();
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/splash.png')} style={styles.image} />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user, setUser }}>
        {user ? <StackNavigation /> : <AuthNavigation />}
      </AuthContext.Provider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '80%',
    height: '30%',
  },
});

export default App;