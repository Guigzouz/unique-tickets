import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { globalStyles } from '../../styles/global';
import { Colors } from '../../styles/colors';
import { db } from '../../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';


const EventSeen = ({ route }) => {
  const { event } = route.params;
  const eventId = event.id;
  const tickets = event.tickets;
  const docRef = doc(db, 'events', eventId);
  const [docSnap, setDocSnap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketCounts, setTicketCounts] = useState({});
  const [selectedCounts, setSelectedCounts] = useState({});

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

  useEffect(() => {
    const countTickets = () => {
      const counts = {};
      for (const ticket of tickets) {
        const category = ticket.category;
        if (counts[category]) {
          counts[category] += 1;
        } else {
          counts[category] = 1;
        }
      }
      setTicketCounts(counts);
      setSelectedCounts({});
    };

    countTickets();
  }, [tickets]);

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp * 1000);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  const handleTicketSelection = (category) => {
    const selectedCount = selectedCounts[category] || 0;
    const maxCount = ticketCounts[category];
    if (selectedCount < maxCount) {
      const updatedSelectedCounts = { ...selectedCounts };
      updatedSelectedCounts[category] = selectedCount + 1;
      setSelectedCounts(updatedSelectedCounts);
    } else {
      Alert.alert(
        'Limite atteinte',
        'Tu as déjà sélectionné tous tes tickets dans cette catégorie',
        [
          { text: 'OK' }
        ]
      );
    }
  };

  const handleTicketDeselection = (category) => {
    const selectedCount = selectedCounts[category] || 0;
    if (selectedCount > 0) {
      const updatedSelectedCounts = { ...selectedCounts };
      updatedSelectedCounts[category] = selectedCount - 1;
      setSelectedCounts(updatedSelectedCounts);
    }
  };

  const handleViewProof = () => {
    Alert.alert(
      'Redirection',
      'Vous allez être redirigé vers votre preuve d\'achat',
      [
        { text: 'OK' }
      ]
    );
    // Ajoutez ici le code pour rediriger l'utilisateur vers la preuve d'achat
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primaryLight} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={singleStyles.container}>
        <Image source={{ uri: event.image }} style={singleStyles.image} />

        <View style={singleStyles.metaContainer}>
          <Text style={globalStyles.nusarTitle}>{event.title}</Text>
          <Text style={globalStyles.secondaryText}>{event.eventType}</Text>
          <Text style={globalStyles.secondaryText}>{event.capacity} places</Text>
          <Text style={globalStyles.secondaryText}>{event.city} - {event.salle}</Text>
          <Text style={globalStyles.secondaryText}>{formatDate(event.date.seconds)}</Text>
        </View>

        <View style={singleStyles.description}>
          <Text style={singleStyles.text}>{event.description}</Text>
        </View>

        <ScrollView style={singleStyles.tickets}>
          {Object.keys(ticketCounts).map((category) => (
            <TouchableOpacity key={category} style={singleStyles.ticketCategory} onPress={() => handleTicketSelection(category)}>
              <View style={singleStyles.ticketCategoryColLeft}>
                <Text style={singleStyles.ticketTextBold}>{category} x{ticketCounts[category]}</Text>
                <Text style={singleStyles.ticketText}>prix catégorie €</Text>
              </View>
              <View style={singleStyles.ticketCategoryColRight}>
                <Text style={singleStyles.ticketTextBold}>Quantité</Text>
                <TouchableOpacity style={singleStyles.quantityContainer} onPress={() => handleTicketDeselection(category)}>
                  <View style={singleStyles.quantityButton}>
                    <Icon name="minus" size={14} color={Colors.primaryLight} />
                  </View>
                  <Text style={singleStyles.quantityText}>{selectedCounts[category] || 0}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={singleStyles.buttonContainer}>
          <TouchableOpacity onPress={handleViewProof} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Voir mon justificatif</Text>
            <Icon style={globalStyles.buttonIcon} name="ticket" size={20} color="black" />
          </TouchableOpacity>
        </View>
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
    height: 200,
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
  },
  description: {
    width: '100%'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 80,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  quantityButton: {
    padding: 5
  },
  quantityText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: Colors.primaryLight,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
});
