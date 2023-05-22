import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../../styles/global'
import { Colors } from '../../styles/colors'
import PreviousEvents from '../../components/PreviousEvents'

const MyTickets = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <View style={myTicketsStyles.container}>
        <Text style={globalStyles.nusarTitle}>mes billets</Text>
      </View>
      <PreviousEvents navigation={navigation} />
    </View>
  )
}

export default MyTickets


const myTicketsStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 35,
    paddingHorizontal: 25,

  },
  post: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
})

const singleStyles = StyleSheet.create({
  container:{
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.secondaryDark,
    borderRadius: 15,
    justifyContent:'center'
  },
  metaContainer:{
    width: '65%',
    paddingHorizontal: 10
  },
  image: {
      width: '35%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 15
  }
});
