import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firebase from '../../firebase';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../../styles/global';



const SearchScreen = () => {



  
  const handleSignOut = () => {
    console.log('il faut ajouter le logout global mtn')

    signOut(auth)
    .then(() => {
    })
    .catch(error => alert(error.message))
  }
    
  
  return (

    <View style={globalStyles.container}>

      <Text>Hey salut !</Text>
      <View style={globalStyles.buttonContainer}>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSignOut}
      >
        <Text style={globalStyles.buttonText}>Cash out</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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