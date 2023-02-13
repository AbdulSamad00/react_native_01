import { useEffect } from "react";
import { Platform } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import expoPushTokensApi from "../api/expoPushTokens";
import navigation from "../navigation/routeNavigation";
export default useNotifications = (notificationListener) => {
  useEffect(() => {
    if (!Device.isDevice) {
      console.log("pushTokens require a device not simulator");
      return;
    }
    registerForPushNotifications();

    if (notificationListener)
      Notifications.addNotificationReceivedListener(notificationListener);
      //naviagation.navigate("componentName");
  }, []);

  const registerForPushNotifications = async () => {
    try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const tokenObject = await Notifications.getExpoPushTokenAsync();
      const token = tokenObject.data;
      console.log("expo push'token: ", token);
      expoPushTokensApi.register(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
