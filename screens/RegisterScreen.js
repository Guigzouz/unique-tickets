import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../styles/global'
import { Colors } from '../styles/colors'

const RegisterScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigation = useNavigation();


  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('registered with:',user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior="padding">

      <Image style={globalStyles.logo} source= {require('../assets/logo/logo.png')}></Image>


      <View style={globalStyles.textView}>
        <Text style={globalStyles.title}>Créer son compte</Text>
      </View>

      <View style={globalStyles.inputContainer}>
        <TextInput
          placeholder='Pseudo'
          placeholderTextColor={Colors.dimmedLight}
          value={name}
          onChangeText={text => setName(text)}
          style={globalStyles.input}
        />

        <TextInput
          placeholder='romain.dupuis@hotmail.fr'
          placeholderTextColor={Colors.dimmedLight}
          value={email}
          onChangeText={text => setEmail(text)}
          style={globalStyles.input}
        />

        <TextInput
          placeholder='******'
          placeholderTextColor={Colors.dimmedLight}
          value={password}
          onChangeText={text => setPassword(text)}
          style={globalStyles.input}
          secureTextEntry
        />
      </View>

      <View
        style={globalStyles.buttonContainer}>

        <TouchableOpacity
        onPress={handleSignUp}
        style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

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