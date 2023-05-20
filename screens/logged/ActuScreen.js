import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../../styles/global'



const ActuScreen = () => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(auth.currentUser.uid).onSnapshot(snapshot => {
      setUserName(snapshot.data().name);
    });

    return () => unsubscribe();
  }, []);

  
  const handleSignOut = () => {
    console.log('il faut ajouter le logout global mtn')

    signOut(auth)
    .then(() => {
    })
    .catch(error => alert(error.message))
  }
    
  
  return (

    <View style={globalStyles.container}>

      <Text>Hey {userName} !</Text>
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