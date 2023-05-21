import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import firebase from 'firebase/app';
import 'firebase/auth';
import { globalStyles } from '../styles/global';
import { Colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';



const ForgotPasswordScreen = () => {

  const [email, setEmail] = useState('')

  const navigation = useNavigation();

  const handlePasswordReset = async (email) => {
    console.log(email)
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        alert('Un mail de vérification a été envoyé')
      })
      .catch(error => alert(error.message));
  };
  
  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior="padding">

      <Image style={globalStyles.logo} source= {require('../assets/logo/logo.png')}></Image>


      <View style={globalStyles.textView}>
        <Text style={globalStyles.title}>Mot de passe oublié</Text>
        <Text style={globalStyles.text}>Aucuns soucis, nous allons vous envoyer un mail</Text>
      </View>



      <View style={globalStyles.inputContainer}>
        <TextInput
          placeholder='romain.dupuis@hotmail.fr'
          placeholderTextColor={Colors.dimmedLight}
          value={email}
          onChangeText={text => setEmail(text)}
          style={globalStyles.input}
        />
      </View>

      <View
        style={globalStyles.buttonContainer}>

        <TouchableOpacity
        onPress={() => {handlePasswordReset(email)}}
        style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>Envoyer le mail</Text>
          <Icon style={globalStyles.buttonIcon} name="paper-plane" size={20} color="black" />

        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputContainer:{
    width: '80%'
  },

  input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5

  },

  buttonContainer:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40

  },

  button:{
    backgroundColor: '#da4116',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
   
  },

  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },

  buttonOutline:{
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#da4116',
    borderWidth: 2

  },

  buttonOutlineText:{
    color: '#da4116',
    fontWeight: '700',
    fontSize: 16
  },

})