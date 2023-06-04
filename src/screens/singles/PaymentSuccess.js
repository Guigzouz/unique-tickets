import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


import { globalStyles } from '../../styles/global';
import { Colors } from '../../styles/colors';


const PaymentSuccess = ({userId, eventId, navigation, docSnap, formatDate, ticketCounts, ticketCategories}) => {



  return (
    <View style={globalStyles.container}>
            <View style={singleStyles.container}>
        <Image
          source={{
            uri: docSnap.data().image
          }}
          style={singleStyles.image}
        />

        <View style={singleStyles.metaContainer}>
          <Text style={globalStyles.nusarTitle}>{docSnap.data().title}</Text>
          <Text style={globalStyles.secondaryText}>{docSnap.data().eventType}</Text>
          <Text style={globalStyles.secondaryText}>{docSnap.data().capacity} places</Text>
          <Text style={globalStyles.secondaryText}>{docSnap.data().city} - {docSnap.data().salle}</Text>
          <Text style={globalStyles.secondaryText}>{formatDate(docSnap.data().date.seconds)}</Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentSuccess;

const singleStyles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingBottom: 50,
    paddingTop: 15,
    justifyContent: 'center',
    width: '100%',
  },
  metaContainer: {
    width: '65%',
    paddingHorizontal: 10,
  },
  image: {
    width: '35%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 15
  },
  title: {
    width: '100%',
    paddingHorizontal: 15
  },
  recapRow:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLight,
    alignItems: 'center',
    alignContent: 'center'
  },
  recapRowTotal:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLight,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  recapContentTitle:{
    flexBasis: '33%',
    textAlign: 'left',
    fontFamily: 'Montserrat',
    color: Colors.primaryLight,
    fontSize: 16
  },
  recapContent:{
    flexBasis: '33%',
    textAlign: 'right',
    fontFamily: 'Montserrat',
    color: Colors.primaryLight,
    fontSize: 16

  },
})