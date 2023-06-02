import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


import { globalStyles } from '../styles/global';
import { Colors } from '../styles/colors';

const PaymentForm = ({ addTicketToFirebase, userId, eventId, navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');



  const handleSubmit = () => {
    if (cardNumber === '' || expiryDate === '' || cvv === '' || name === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs du formulaire');
    } else {
      // Logique de traitement du formulaire de paiement
      console.log('Carte bleue soumise : ', { cardNumber, expiryDate, cvv, name });
      addTicketToFirebase(userId, eventId);
      navigation.navigate('PaymentSuccess')

    }
  };

  return (
    <View style={paymentStyles.container}>
      <View style={paymentStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Numéro de carte"
          onChangeText={setCardNumber}
          value={cardNumber}
          placeholderTextColor={Colors.primaryLight}
        />
        <View style={paymentStyles.inlineInputContainer}>
          <TextInput
            style={[globalStyles.input, paymentStyles.inlineInput]}
            placeholder="CVV"
            onChangeText={setCvv}
            value={cvv}
            placeholderTextColor={Colors.primaryLight}
          />
          <TextInput
            style={[globalStyles.input, paymentStyles.inlineInput]}
            placeholder="Péremption"
            onChangeText={setExpiryDate}
            value={expiryDate}
            placeholderTextColor={Colors.primaryLight}
          />
        </View>
        <TextInput
          style={globalStyles.input}
          placeholder="Nom sur la carte"
          onChangeText={setName}
          value={name}
          placeholderTextColor={Colors.primaryLight}
        />
      </View>
      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Payer</Text>
          <Icon style={globalStyles.buttonIcon} name="credit-card" size={20} color={Colors.primaryDark} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentForm;

const paymentStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 350,
  },
  inputContainer: {
    width: '100%',
  },
  inlineInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineInput: {
    width: '48%',
  },
});
