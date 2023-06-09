import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
// Import des éléments internes à l'application
import { globalStyles } from '../../styles/global'
import { Colors } from '../../styles/colors'
import useAuthStore from '../../services/AuthStore';





// const LoginScreen = (route) => {
  const LoginScreen = () => {
    
    // const { refreshNavigation } = route.params;
    const { login } = useAuthStore();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigation = useNavigation();
    

  const handleLogin = async () => { 
    login(email, password);

  }

  
  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior="padding">
      
      <Image style={globalStyles.logo} source= {require('../../../assets/logo/logo.png')}></Image>


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
          <Icon style={globalStyles.buttonIcon} name="sign-out-alt" size={20} color="black" />

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