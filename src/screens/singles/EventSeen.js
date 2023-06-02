import { Image, View, ActivityIndicator, StyleSheet, Text, ScrollView } from 'react-native';
import { auth, db } from '../../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { globalStyles } from '../../styles/global';
import { useEffect, useState } from 'react';
import { Colors } from '../../styles/colors';
import React from "react";


const EventSeen = ({ route, navigation }) => {
  const { event, ticket } = route.params;
  const eventId = event.id;
  const tickets = event.tickets;
  const docRef = doc(db, 'events', eventId);
  const [docSnap, setDocSnap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCollectionData = async () => {
      try {
        const snapshot = await getDoc(docRef);
        setDocSnap(snapshot);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching event:', error);
      }
    };

    getCollectionData();
  }, []);

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp * 1000);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={singleStyles.container}>
        <Image source={{ uri: event.image }} style={singleStyles.image} />
        <View style={singleStyles.metaContainer}>
          <Text style={singleStyles.text}>{event.title}</Text>
          <Text style={singleStyles.text}>{event.artist}</Text>
          <Text style={singleStyles.text}>{event.city} - {event.salle}</Text>
          <Text style={singleStyles.text}>{formatDate(event.date.seconds)}</Text>
        </View>
        <ScrollView style={singleStyles.tickets}>
          {tickets.map((ticket) => (
            <View key={ticket.ticketId} style={singleStyles.ticketCategory}>
              <View style={singleStyles.ticketCategoryColLeft}>
                <Text style={singleStyles.ticketText}>{ticket.category}</Text>
                <Text style={singleStyles.ticketTextBold}>{ticket.price} €</Text>
              </View>
              <View style={singleStyles.ticketCategoryColRight}>
                {/* <Text style={singleStyles.ticketText}>Quantity: {ticket.quantity}</Text>
                <Text style={singleStyles.ticketText}>Total: {ticket.quantity * ticket.price} €</Text> */}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default EventSeen;

const singleStyles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 25,
    justifyContent: 'center'
  },
  metaContainer: {
    width: '65%',
    paddingHorizontal: 10
  },
  image: {
    width: '35%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 15
  },
  text: {
    paddingVertical: 15,
    textAlign: 'left',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat',
    fontSize: 16
  },
  tickets: {
    width: '100%',
    height: 400,
    marginVertical: 20
  },
  ticketCategory: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 90,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryLight,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 10
  },
  ticketCategoryColLeft: {
    width: '50%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  ticketCategoryColRight: {
    width: '50%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  ticketText: {
    textAlign: 'left',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat',
    fontSize: 16
  },
  ticketTextBold: {
    textAlign: 'left',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    marginBottom: 5
  }
});
