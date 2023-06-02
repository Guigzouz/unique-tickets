import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
// Import des éléments internes à l'application
import LoginScreen from './src/screens/authStack/LoginScreen';
import ForgotPasswordScreen from './src/screens/authStack/ForgotPasswordScreen';
import RegisterScreen from './src/screens/authStack/RegisterScreen';
import CustomHeader from './src/navigation/CustomHeader';
import useAuthStore from './src/services/AuthStore';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import Event from './src/screens/singles/Event';
import EventSeen from './src/screens/singles/EventSeen';
import EditProfile from './src/screens/loggedStack/EditProfile';
import PaymentSuccess from './src/screens/singles/PaymentSuccess';



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


  if (!user) {
    // Render your login screen.
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: CustomHeader}}>
          <Stack.Screen options={{headerShown : false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown : true}} name="Register" component={RegisterScreen} />
          <Stack.Screen options={{headerShown : true}} name="ForgotPassword" component={ForgotPasswordScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Render your app.
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{header: CustomHeader}}>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="EventSeen" component={EventSeen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="Edit" component={EditProfile} />
    </Stack.Navigator>
  </NavigationContainer>

  );
};
