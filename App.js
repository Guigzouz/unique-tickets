import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import ProfileScreen from './screens/logged/ProfileScreen';
import CustomHeader from './components/CustomHeader';
import useAuthStore from './store/AuthStore';
import MainTabNavigator from './components/MainTabNavigator';


const Stack = createNativeStackNavigator();

export default function App() {
  // useState qui permet de refresh le fichier APP.JS
  const { user, checkAuthState } = useAuthStore();

  useEffect(() => {
    const unsubscribe = checkAuthState();

    return () => unsubscribe();
  }, []);

  
  // Expo font hook, s'assure de charger les polices
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
    'Nusar': require('./assets/fonts/NUSAR-Regular.ttf'),
  });

// s'assure que les polices sont bien chargées
  if (!fontsLoaded) {
    return null;
  }


  if (user) {
    // Render your login screen.
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: CustomHeader}}>
          <Stack.Screen options={{headerShown : false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown : true}} name="Register" component={RegisterScreen} />
          <Stack.Screen options={{headerShown : true}} name="ForgotPassword" component={ForgotPasswordScreen}/>
          <Stack.Screen options={{headerShown : false}} name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Render your app.
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{header: CustomHeader}}>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>

  );
};
