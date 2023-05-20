import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../../styles/global';
import { Colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';






const TicketScreen = () => {

  const handleEdit = () => {
    console.log('faire un handleEdit')
  }
  
  const handleSignOut = () => {
    console.log('il faut ajouter le logout global mtn')

    signOut(auth)
    .then(() => {
    })
    .catch(error => alert(error.message))
  }
    
  
  return (

    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={profileStyles.container}>
      <Text style={globalStyles.nusarTitle}>mes informations</Text>

      <View style={profileStyles.infosContainer}>
        <View style={profileStyles.info}>
          <Text style={profileStyles.text}>{auth.currentUser?.email}email dynamique</Text>
          <Text style={profileStyles.text}>Pseudo dynamique</Text>
        </View>
          <TouchableOpacity 
          style={profileStyles.editInfo}
          onPress={handleEdit}
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

      </ScrollView>

      {/* le point d'intérogation de currentUser indique que cette variable peut être undefined et evite un crash de l'app */}
    </View>
  )
}

export default TicketScreen

const profileStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 35,
    paddingHorizontal: 25,
  },
  infosContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingVertical:25,
    paddingHorizontal: 25

  },
  info:{
    width: '80%'
  },
  editInfo:{
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    width:'20%',
    height: '100%',
    borderRadius: 15
  },
  text:{
    paddingVertical: 5,
    textAlign: 'left',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat',
  },
  buttonContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 40,
    marginBottom: 40

  },

})