import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TicketScreen from '../screens/logged/TicketScreen';
import SearchScreen from '../screens/logged/SearchScreen';
import { Colors } from '../styles/colors';
import MyTickets from '../screens/logged/MyTickets';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    return (
      <Tab.Navigator 
      initialRouteName='MainTab'
      screenOptions={({route}) => ({
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
        tabBarLabelStyle:{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }

      })}
      >
        <Tab.Screen name="Mes Billets" options={{ headerShown : false}} component={MyTickets} />
        <Tab.Screen name="Fil d'actu" options={{ headerShown : false}} component={SearchScreen} />
        <Tab.Screen name="Profil" options={{ headerShown : false}} component={TicketScreen} />
        {/* rechanger le sens apres custom tabbar */}
      </Tab.Navigator>
    );
  }


export default MainTabNavigator;