import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user){
        navigation.navigate("Home")
      }
    }) 

    // unsubscribe va stopper le listner firebase lorsque l'utilisateur sort de la page login
    return unsubscribe
  }, [])

  // const handleSignUp = () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //   .then(userCredentials => {
  //     const user = userCredentials.user;
  //     console.log('registered with:',user.email);
  //   })
  //   .catch(error => alert(error.message))
  // }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('logged in with:', user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Identifiant'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder='Mot de passe'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View>
        <TouchableOpacity style={styles.text} onPress={() => navigation.navigate('Register')}>
          <Text>Pas encore de compte ? Inscris-toi ici.</Text>
        </TouchableOpacity>
      </View>

      <View
        style={styles.buttonContainer}>

        <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        >
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>S'enregistrer</Text>
        </TouchableOpacity> */}

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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

  text:{
    paddingVertical: 15
  }

})