import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { db } from '../../firebase';
import { globalStyles } from '../../styles/global';
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../styles/colors';

const SearchScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const querySnapshot = await db.collection('events').get();
        const data = querySnapshot.docs.map((doc) => doc.data());
        setEvents(data);
      } catch (error) {
        console.log('Error fetching events:', error);
      }
    };

    getEvents();
  }, []);

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp * 1000);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={eventStyles.container}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() =>
              navigation.navigate('Event', { eventId: event.id })
            }
            style={eventStyles.post}
          >
            <Image source={{
              uri: event.image
              }} style={eventStyles.image}>
              </Image>
            <Text style={eventStyles.title}>{event.title}</Text>
            <Text style={eventStyles.secondaryText}>{event.artist}</Text>
            <Text style={eventStyles.secondaryText}>{event.city} - {event.salle}</Text>
            <Text style={eventStyles.secondaryText}>{formatDate(event.date.seconds)}</Text>
            <Text style={eventStyles.price}>à partir de {event.startingPrice} €</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const { width } = Dimensions.get('window');
const eventStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  post: {
    width: width / 2 - 25,
    margin: 10,
    padding: 10,
    backgroundColor: Colors.postColor,
    borderRadius: 15
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 15
  },
  title:{
    paddingTop: 5,
    textAlign: 'left',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat',
  },
  secondaryText:{
    textAlign: 'left',
    color: Colors.postSecondaryColor,
    fontFamily: 'Montserrat-Italic',
  },
  price:{
    marginTop: 25,
    textAlign: 'right',
    color: Colors.primaryLight,
    fontFamily: 'Montserrat'
  }
});
