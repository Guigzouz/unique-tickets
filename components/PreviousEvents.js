import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../styles/global'
import { Colors } from '../styles/colors'



const PreviousEvents = ({navigation}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    fetchEvents(userId)
      .then(events => {
        setEvents(events);
      })
      .catch(error => {
        // Gérer les erreurs lors de la récupération des billets
        console.error(error);
      });
  }, []);

  async function fetchEvents(userId) {
    const junctions = await db
      .collection(`junction_users_events`)
      .where("userId", "==", userId)
      .get();
  
    const events = await Promise.all(
      junctions.docs
        .filter(doc => doc.exists)
        .map(doc => db.doc(`events/${doc.data().eventId}`).get())
    );
  
    return events.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
  }

  fetchEvents(auth.currentUser.uid);

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp * 1000);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };
  
  return (

    <ScrollView contentContainerStyle={myTicketsStyles.container}>
        {events.map((events) => (
          <TouchableOpacity
            key={events.id}
            onPress={() =>
              navigation.navigate('Event', { eventId: events.id })
            }
            style={myTicketsStyles.post}
          >
          <View style={singleStyles.container}>
            <Image source={{
              uri: events.image
              }} style={singleStyles.image}>
              </Image>

              <View style={singleStyles.metaContainer}>
                <Text style={globalStyles.nusarTitle}>{events.title}</Text>
                <Text style={globalStyles.secondaryText}>{events.eventType}</Text>
                <Text style={globalStyles.secondaryText}>{events.capacity} places</Text>
                <Text style={globalStyles.secondaryText}>{events.city} - {events.salle}</Text>
                <Text style={globalStyles.secondaryText}>{formatDate(events.date.seconds)}</Text>

              </View>
              </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
  )
}

export default PreviousEvents


const myTicketsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 5,

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
