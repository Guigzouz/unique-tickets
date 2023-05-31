import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
// Import des éléments internes à l'application

import { globalStyles } from '../../styles/global'
import { Colors } from '../../styles/colors'
import { auth, db } from '../../../firebase'


const RegisterScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSignUp = async () => {
    let userCredentials;
    try {
      userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      // ajoute a la collection user, un utilisateur avec un nom et un lien entre les deux collections
      await db.collection('users').doc(userCredentials.user.uid).set({
        name: name
      });
      const user = userCredentials.user;
      console.log('registered with:',user.email);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior="padding">

      <Image style={globalStyles.logo} source= {require('../../../assets/logo/logo.png')}></Image>


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
          <Icon style={globalStyles.buttonIcon} name="user-plus" size={20} color="black" />

        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
