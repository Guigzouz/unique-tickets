import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { auth, db } from '../../../firebase';
import { globalStyles } from '../../styles/global';
import { Colors } from '../../styles/colors';
import PreviousEvents from '../../components/PreviousEvents';
import useAuthStore from '../../services/AuthStore';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const { logout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(auth.currentUser.uid).onSnapshot(snapshot => {
      setUserName(snapshot.data().name);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Se déconnecter',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={profileStyles.container}>
        <Text style={globalStyles.nusarTitle}>mes informations</Text>
        <View style={profileStyles.infosContainer}>
          <View style={profileStyles.info}>
            <Text style={profileStyles.text}>{auth.currentUser?.email}</Text>
            <Text style={profileStyles.text}>{userName}</Text>
          </View>
          <TouchableOpacity
            style={profileStyles.editInfo}
            onPress={() => navigation.navigate('Edit')}
          >
            <Icon name="pen" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={profileStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.invertButton}
            onPress={handleSignOut}
          >
            <Text style={globalStyles.invertButtonText}>Se déconnecter</Text>
            <Icon style={globalStyles.buttonIcon} name="sign-out-alt" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={globalStyles.nusarTitle}>mes anciens billets</Text>
      </View>

      <PreviousEvents navigation={navigation} />
    </View>
  );
};

export default ProfileScreen;

const profileStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 35,
    paddingHorizontal: 25,
    height: '55%'
  },
  infosContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  info: {
    width: '80%'
  },
  editInfo: {
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '100%',
    borderRadius: 15
  },
  text: {
    paddingVertical: 5,
    textAlign: 'left',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat',
  },
  buttonContainer: {
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 40,
    marginBottom: 40
  },
});
