import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../styles/colors';
import { globalStyles } from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Import des éléments internes à l'application
import SearchScreen from '../screens/loggedStack/SearchScreen';
import MyTickets from '../screens/loggedStack/MyTickets';
import ProfileScreen from '../screens/loggedStack/ProfileScreen';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Fil d'actu"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          marginBottom: 25,
          marginHorizontal: 25,
          paddingBottom: 15,
          paddingTop: 15,
          borderRadius: 25,
          borderTopWidth: 0,
          backgroundColor: Colors.secondaryDark
        },
        tabBarLabelStyle: {
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          let iconName;

          if (route.name === 'Mes Billets') {
            IconComponent = FontAwesome;
            iconName = focused ? 'ticket' : 'ticket'; // Change the icon name and color based on focus
          } else if (route.name === 'Fil d\'actu') {
            IconComponent = Ionicons;
            iconName = focused ? 'newspaper' : 'newspaper-outline'; // Change the icon name and color based on focus
          } else if (route.name === 'Profil') {
            IconComponent = FontAwesome;
            iconName = focused ? 'user' : 'user-o'; // Change the icon name and color based on focus
          }

          // Return the custom icon component
          return <IconComponent style={globalStyles.buttonIcon} name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primaryPurple,
        tabBarInactiveTintColor: 'grey',

      })}
    >
      <Tab.Screen
        name="Mes Billets"
        options={{ headerShown: false }}
        component={MyTickets}
      />
      <Tab.Screen
        name="Fil d'actu"
        options={{ headerShown: false }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Profil"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
