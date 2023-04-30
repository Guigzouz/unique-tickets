import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';



const LoginScreen = () => {

  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigation = useNavigation();

  async function getToken(){
    try {
      const user = auth.currentUser;
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          setToken(idTokenResult.token);
          console.log('token set')
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function saveToken(jwt, token) {
      await SecureStore.setItemAsync(jwt, token);
    }

    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log("🔐 Here's your value in LoginScreen 🔐 \n" + result);
      } else {
        console.log('No values stored under that key.');
      }
    }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user){
        console.log('here')
      }
    }) 


    // unsubscribe va stopper le listner firebase lorsque l'utilisateur sort de la page login
    return unsubscribe
  }, [])

  const handleLogin = async () => { 


    await signInWithEmailAndPassword(auth, email, password)
    .then(async userCredentials => {
      const user = userCredentials.user;
      await getToken()
      console.log('firebase : logged in')
    })
    .catch(error => setError(error.message))
    
    await saveToken('jwt', token);
    await getValueFor('jwt');

  }



  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">

      <View style={styles.inputContainer}>
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
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

      <View style={styles.textView}>
        <TouchableOpacity style={styles.text} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        
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

  textView:{
    paddingVertical: 15,
  },

  text:{
    paddingVertical: 5,
    textAlign: 'center'
  },

})