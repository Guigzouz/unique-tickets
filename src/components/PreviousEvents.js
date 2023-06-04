import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FieldPath, auth, db } from '../../firebase'
import { Colors } from '../styles/colors';

const PreviousEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents(auth.currentUser.uid)
      .then((events) => {
        setEvents(events);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchEvents = async (userId) => {
    const ticketsSnapshot = await db
      .collection('tickets')
      .where('userId', '==', userId)
      .get();

    const tickets = ticketsSnapshot.docs.map((doc) => doc.data());
    const eventIds = tickets.map((ticket) => ticket.eventId);
    // console.log('Event IDs:', eventIds);

    const eventsSnapshot = await db
      .collection('events')
      .where(FieldPath.documentId(), 'in', eventIds)
      .get();

    const events = eventsSnapshot.docs.map((doc) => {
      const eventId = doc.id;
      const eventTicket = tickets.filter((ticket) => ticket.eventId === eventId);
      const category = eventTicket[0].category;
      const price = eventTicket[0].price;

      return {
        id: eventId,
        category,
        price,
        count: eventTicket.length,
        tickets: eventTicket,
        ...doc.data(),
      };
    });

    return events;
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

  // console.log('Events:', events);

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
          onPress={() => navigation.navigate('EventSeen', { event, ticket: event.tickets })}
          style={eventStyles.post}
        >
          <Image source={{ uri: event.image }} style={eventStyles.image} />
          <Text style={eventStyles.title}>{event.title}</Text>
          <Text style={eventStyles.secondaryText}>{event.artist}</Text>
          <Text style={eventStyles.secondaryText}>
            {event.city} - {event.salle}
          </Text>
          <Text style={eventStyles.secondaryText}>{formatDate(event.date.seconds)}</Text>
          <Text style={eventStyles.title}>Tickets: {event.count}</Text>
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
