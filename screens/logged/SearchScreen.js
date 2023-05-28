import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { db } from '../../firebase';
import { globalStyles } from '../../styles/global';
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../styles/colors';
import SearchBar from '../../components/SearchBar';
import Fuse from 'fuse.js';


const SearchScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [searchPhrase]);


  // UTILISATION DE L'ALGORITHME FUZZY SEARCH POUR GERER LES FAUTES DE FRAPPE
  const fetchEvents = async () => {
    try {
      let query = db.collection('events');
  
      if (searchPhrase !== "") {
        const options = {
          keys: ['title', 'artist', 'salle'], // Specify the fields to search in
          includeScore: true, // Include score for each result
          threshold: 0.4, // Adjust the threshold for fuzzy matching
        };
        
        const fuse = new Fuse(events, options);
        const searchResults = fuse.search(searchPhrase);
  
        // Extract the matched items from the search results
        const data = searchResults.map((result) => result.item);
        
        setEvents(data);
      } else {
        // No search phrase provided, fetch all events
        const querySnapshot = await query.get();
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(data);
      }
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  };
  
  

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp * 1000);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchEvents().then(() => {
      setRefreshing(false);
    }).catch((error) => {
      console.error(error);
      setRefreshing(false);
    });
  };

  return (
    <View style={globalStyles.container}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <ScrollView
        contentContainerStyle={eventStyles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primaryLight} // Définir la couleur de l'icône de chargement
          />
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  post: {
    width: width / 2 - 20,
    marginHorizontal: 5,
    marginBottom: 10,
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
    fontFamily: 'Montserrat'
  }
});
