import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firebase from '../../firebase';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../../styles/global'



const SearchScreen = () => {

    const [user, setUser] = useState(null);
    

    // Get the current user's ID token
    const getCurrentUser = async (key) => {
      const idToken = await SecureStore.getItemAsync(key);
      // Decode the ID token to get user information
      const decodedToken = await auth.verifyIdToken(idToken);
      console.log("here is the decoded one :",decodedToken)
      // Set the user's information to the state
      setUser(decodedToken);
    };

    getCurrentUser('jwt');



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
      <Text>Hey salut {user && user.name} !</Text>
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