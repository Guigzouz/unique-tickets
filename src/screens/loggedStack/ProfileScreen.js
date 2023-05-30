import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
// Import des éléments internes à l'application
import { auth } from '../../../firebase'
import { globalStyles } from '../../styles/global';
import useAuthStore from '../../services/AuthStore';




const ProfileScreen = () => {
  const { logout } = useAuthStore();


  
    const handleSignOut = () => {
      logout();
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

export default ProfileScreen
