import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../styles/global'
import { Colors } from '../styles/colors'
import * as SecureStore from 'expo-secure-store';




const LoginScreen = () => {
  

  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigation = useNavigation();

  // async function getToken(){
  //   try {
  //     const user = auth.currentUser;
  //       if (user) {
  //         const idTokenResult = await user.getIdTokenResult();
  //         setToken(idTokenResult.token);
  //         console.log('token set')
          
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async function getToken(){
    try {
      const user = auth.currentUser;
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          return idTokenResult?.token
        }
      } catch (error) {
        console.log(error);
      }
    }


    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log("🔐 Here's your value in LoginScreen 🔐 \n" + result);
      } else {
        console.log('No values stored under that key.');
      }
    }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //     if (user){
  //       console.log('here')
  //     }
  //   }) 
    
    
  //   // unsubscribe va stopper le listner firebase lorsque l'utilisateur sort de la page login
  //   return unsubscribe
  // }, [])

    // await signInWithEmailAndPassword(auth, email, password)
    // .then(async userCredentials => {
    //   const user = userCredentials.user;
    //   console.log('firebase logged in :', user.email)
    // }).catch(error => setError(error.message))
    
    // getToken()


  const handleLogin = async () => { 
    try {
    await signInWithEmailAndPassword(auth, email, password)
 
     const userToken = await getToken();
     await SecureStore.setItemAsync('jwt', JSON.stringify(userToken));
     setToken(userToken);
    } catch (err) {
     console.log(err.message)
    }

    getValueFor('jwt')
}


  
  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior="padding">
      
      <Image style={globalStyles.logo} source= {require('../assets/logo/logo.png')}></Image>


      <View style={globalStyles.textView}>
        <Text style={globalStyles.title}>Déjà de retour ? ;)</Text>
      </View>

      <View style={globalStyles.inputContainer}>
        {error ? <Text style={{ color: Colors.dimmedLight, textAlign: 'center' }}>{error}</Text> : null}
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
        onPress={handleLogin}
        style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>Connexion</Text>
        </TouchableOpacity>



      </View>
      <View style={globalStyles.textView}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={globalStyles.textUnderline}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={globalStyles.textUnderline}>Pas encore de compte ? Inscris-toi ici.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen