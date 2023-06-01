import { Image, View, ActivityIndicator, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { auth, db } from '../../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { globalStyles } from '../../styles/global';
import { useEffect, useState } from 'react';
import { Colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";


const EventSeen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const docRef = doc(db, 'events', eventId);
  const [docSnap, setDocSnap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketCounts, setTicketCounts] = useState({}); // État pour stocker le nombre de tickets pour chaque catégorie
  const [ticketCategories, setTicketCategories] = useState([]);




  useEffect(() => {
    const getCollectionData = async () => {
      try {
        const snapshot = await getDoc(docRef);
        setDocSnap(snapshot);
        setLoading(false);

        // Vérifie si des catégories de tickets existent et extrait les valeurs dans la const categories
        if (snapshot.exists() && snapshot.data().ticketCategories) {
          const categories = Object.values(snapshot.data().ticketCategories);
          setTicketCategories(categories);
        }
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
        <Image
          source={{
            uri: docSnap.data().image
          }}
          style={singleStyles.image}
        />

        <View style={singleStyles.metaContainer}>
          <Text style={globalStyles.nusarTitle}>{docSnap.data().title}AA</Text>
          <Text style={globalStyles.secondaryText}>{docSnap.data().eventType}</Text>
          <Text style={globalStyles.secondaryText}>{docSnap.data().capacity} places</Text>
          <Text style={globalStyles.secondaryText}>{docSnap.data().city} - {docSnap.data().salle}</Text>
          <Text style={globalStyles.secondaryText}>{formatDate(docSnap.data().date.seconds)}</Text>
        </View>

        <View style={singleStyles.description}>
          <Text style={singleStyles.text}>{docSnap.data().description}</Text>
        </View>

        
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.button}
          >
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
  contentContainer: {
    backgroundColor: "white",
  },
  cursorHandle: {
    backgroundColor: Colors.primaryLight, // customize the cursor handle color

  }
});