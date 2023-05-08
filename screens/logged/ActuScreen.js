import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../../styles/global'



const ActuScreen = () => {
  const user = auth.currentUser;


  const deleteSecureItem = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`Successfully deleted key: ${key}`);
    } catch (error) {
      console.log(`Error deleting key: ${key}. Error: ${error}`);
    }
  }

  
    const handleSignOut = () => {
      signOut(auth)
      .then(() => {
        deleteSecureItem('jwt');
      })
      .catch(error => alert(error.message))
    }
    
    
  
  return (

    <View style={globalStyles.container}>

      {/* le point d'intérogation de currentUser indique que cette variable peut être undefined et evite un crash de l'app */}
      <Text>Hey salut {auth.currentUser?.email} !</Text>
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

export default ActuScreen

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