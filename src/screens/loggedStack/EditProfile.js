import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../styles/global'
import { Colors } from '../../styles/colors'

const EditProfile = () => {

    const [userName, setUserName] = useState('');

    useEffect(() => {
      const unsubscribe = db.collection('users').doc(auth.currentUser.uid).onSnapshot(snapshot => {
        setUserName(snapshot.data().name);
      });
  
      return () => unsubscribe();
    }, []);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigation = useNavigation();

  console.log(auth.currentUser?.email)

  
  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior="padding">
        
        <View>
            <Text style={globalStyles.nusarTitle}>Modifier mes infos</Text>
        </View>


      <View style={globalStyles.inputContainer}>
        <TextInput
          placeholder={userName}
          placeholderTextColor={Colors.primaryLight}
          value={name}
          onChangeText={text => setName(text)}
          style={globalStyles.input}
        />

        <TextInput
          placeholder={auth.currentUser?.email}
          placeholderTextColor={Colors.primaryLight}
          value={email}
          onChangeText={text => setEmail(text)}
          style={globalStyles.input}
        />

        <TextInput
          placeholder='Ancien mot de passe'
          placeholderTextColor={Colors.dimmedLight}
          value={password}
          onChangeText={text => setPassword(text)}
          style={globalStyles.input}
          secureTextEntry
        />

        {/* REELLEMENT FAIRE LA MODIFICATION DE MDP */}
        <TextInput
          placeholder='Nouveau mot de passe'
          placeholderTextColor={Colors.dimmedLight}
          value={password}
          onChangeText={text => setPassword(text)}
          style={globalStyles.input}
          secureTextEntry
        />
        <TextInput
          placeholder='Comfirmation nouveau mot de passe'
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
        style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>Valider</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default EditProfile

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