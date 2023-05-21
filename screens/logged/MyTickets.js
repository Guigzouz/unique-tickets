import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../../styles/global'



const MyTickets = () => {

  
  const handleSignOut = () => {
    console.log('il faut ajouter le logout global mtn')

    signOut(auth)
    .then(() => {
    })
    .catch(error => alert(error.message))
  }
    
  
  return (

    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={myticketStyles.container}>
        <Text style={globalStyles.nusarTitle}>Mes billets</Text>
      </ScrollView>
    </View>
  )
}

export default MyTickets

const myticketStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 35,
    paddingHorizontal: 25,
  },

  button:{
    backgroundColor: '#da4116',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
   
  },

  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },

})