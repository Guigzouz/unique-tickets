import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import * as SecureStore from 'expo-secure-store';
import connectionStore from './store/ConnectionStore';
import { useEffect } from 'react';


const Stack = createNativeStackNavigator();

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
  const { connected, setConnected, setDisconnected } = connectionStore();
  
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


  return (
    <NavigationContainer>

    <Stack.Navigator>
      {
        !connected &&
        <>
        <Stack.Screen options={{headerShown : false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown : true}} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{headerShown : true}} name="ForgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen options={{headerShown : false}} name="Home" component={HomeScreen} />

        </>
      }
      {
        connected &&
        <>
        <Stack.Screen name="Home" component={HomeScreen} />
        </>
      }

  </Stack.Navigator>

    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator>
        // <Stack.Screen options={{headerShown : false}} name="Login" component={LoginScreen} />
        // <Stack.Screen options={{headerShown : true}} name="Register" component={RegisterScreen} />
        // <Stack.Screen options={{headerShown : true}} name="ForgotPassword" component={ForgotPasswordScreen}/>
        // <Stack.Screen options={{headerShown : false}} name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
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
