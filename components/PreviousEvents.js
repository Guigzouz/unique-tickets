import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { globalStyles } from '../styles/global'
import { Colors } from '../styles/colors'

const PreviousEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents(auth.currentUser.uid)
      .then((events) => {
        setEvents(events);
      })
      .catch((error) => {
        // Gérer les erreurs lors de la récupération des billets
        console.error(error);
      });
  }, []);

  const fetchEvents = async (userId) => {
    const junctions = await db
      .collection('junction_users_events')
      .where('userId', '==', userId)
      .get();

    const events = await Promise.all(
      junctions.docs
        .filter((doc) => doc.exists)
        .map((doc) => db.doc(`events/${doc.data().eventId}`).get())
    );

    return events
      .filter((doc) => doc.exists)
      .map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp * 1000);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchEvents(auth.currentUser.uid)
      .then((events) => {
        setEvents(events);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setRefreshing(false);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={eventStyles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.primaryLight} />
      }
    >
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          onPress={() => navigation.navigate('Event', { eventId: event.id })}
          style={eventStyles.post}
        >
          <Image source={{ uri: event.image }} style={eventStyles.image} />
          <Text style={eventStyles.title}>{event.title}</Text>
          <Text style={eventStyles.secondaryText}>{event.artist}</Text>
          <Text style={eventStyles.secondaryText}>
            {event.city} - {event.salle}
          </Text>
          <Text style={eventStyles.secondaryText}>
            {formatDate(event.date.seconds)}
          </Text>
          <Text style={eventStyles.price}>à partir de {event.startingPrice} €</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PreviousEvents;

const { width } = Dimensions.get('window');
const eventStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    width: width,
  },
  post: {
    width: width / 2 - 20,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.postColor,
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  title: {
    paddingTop: 5,
    textAlign: 'left',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat',
  },
  secondaryText: {
    textAlign: 'left',
    color: Colors.postSecondaryColor,
    fontFamily: 'Montserrat-Italic',
  },
  price: {
    marginTop: 25,
    textAlign: 'right',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat',
  },
});
