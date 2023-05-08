import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SearchScreen from './screens/logged/SearchScreen';
import * as SecureStore from 'expo-secure-store';
import connectionStore from './store/ConnectionStore';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import ActuScreen from './screens/logged/ActuScreen';
import ProfileScreen from './screens/logged/ProfileScreen';
import TicketScreen from './screens/logged/TicketScreen';
import CustomHeader from './components/CustomHeader';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("App.js : 🔐 Here's your value in app.js 🔐 \n" + result);
    const jwt = result;
    return jwt;
  } else {
    console.log('App.js : No values stored under that key.');
  }
}




export default function App() {
  // useState qui permet de refresh le fichier APP.JS
  const [refreshKey, setRefreshKey] = useState(0);

  
  // Expo font hook, s'assure de charger les polices
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
  });

  // déclare les etats de connexion pour le store zustand
  const { connected, setConnected, setDisconnected } = connectionStore();


  function refreshNavigation() {
    setRefreshKey(refreshKey + 1);
  }
  
  // change l'état en fonction de la presence ou non d'un jwt
  useEffect(() => {
    getValueFor('jwt').then((jwt) => {
      if (jwt && !connected) {
        setConnected();
        console.log('connected')
      } else if(!jwt && connected) {
        setDisconnected();
        console.log('disconnected')
      }
    })
  }, [connected])

// s'assure que les polices sont bien chargées
  if (!fontsLoaded) {
    return null;
  }

// défini le TabNavigator qui sera utilisé quand user est connecté
  function MainTabNavigator() {
    return (
      <Tab.Navigator initialRouteName='MainTab'>
        <Tab.Screen name="Search" options={{ headerShown : false}} component={SearchScreen} />
        <Tab.Screen name="Actu" options={{ headerShown : false}} component={ActuScreen} />
        <Tab.Screen name="Ticket" options={{ headerShown : false}} component={TicketScreen} />
      </Tab.Navigator>
    );
  }


  return (
    <NavigationContainer>

    <Stack.Navigator key={refreshKey} screenOptions={{header: CustomHeader}}>
      {
        !connected &&
        <>
        {/* <Stack.Screen options={{headerShown : false}} name="Login" component={LoginScreen} initialParams={{refreshNavigation}}/> */}
        <Stack.Screen options={{headerShown : false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown : true}} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{headerShown : true}} name="ForgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen options={{headerShown : false}} name="Home" component={HomeScreen} />

        </>
      }
      {
        connected &&
        <>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      }

  </Stack.Navigator>

    </NavigationContainer>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
