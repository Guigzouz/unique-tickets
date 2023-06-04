import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { globalStyles } from "../styles/global";
import { Colors } from "../styles/colors";
import PaymentForm from "./PaymentForm";
import { auth } from "../../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../firebase";


const BottomSheetComponent = ({ docSnap, formatDate, ticketCounts, ticketCategories, eventId, navigation }) => {
    const userId = auth.currentUser?.uid;
    // Filtrage des catégories de tickets, exclure celles avec 0 tickets sélectionnés
    const selectedTicketCategories = ticketCategories.filter(
      (category) => ticketCounts[category.categoryName] > 0
    );
    
  // Ajouter le ticket à la collection "tickets"
  const addTicketToFirebase = async (userId, eventId) => {
    try {
      
      for (const category in ticketCounts) {
        const count = ticketCounts[category];
        const categoryObj = ticketCategories.find((cat) => cat.categoryName === category);
        if (categoryObj && count > 0) {
          for (let i = 0; i < count; i++) {
            const ticket = {
              userId,
              eventId,
              category: categoryObj.categoryName,
              price: categoryObj.price,
            };
            await db.collection('tickets').add(ticket);
          }
        }
      }
      
      console.log('Tickets ajoutés avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout des tickets :', error);
    }
  };

    const calculateTotal = (ticketCounts, ticketCategories) => {
      let total = 0;
      for (const category in ticketCounts) {
        const count = ticketCounts[category];
        const categoryObj = ticketCategories.find((cat) => cat.categoryName === category);
        if (categoryObj) {
          total += count * categoryObj.price;
        }
      }
      return total;
    };

    const total = calculateTotal(ticketCounts, ticketCategories);


  return (
    <BottomSheetScrollView>
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
      <View style={singleStyles.title}>
      <Text style={globalStyles.nusarTitle}>Billets séléctionnés</Text>
      </View>
      <View style={singleStyles.container}>
        {/* Afficher les informations des catégories de tickets sélectionnées */}
        {selectedTicketCategories.map((category) => (
          <View key={category.categoryName} style={singleStyles.recapRow}>
            <Text style={singleStyles.recapContentTitle}>{category.categoryName}</Text>
            <Text style={singleStyles.recapContent}>{category.price} €</Text>
            <Text style={singleStyles.recapContent}>x{ticketCounts[category.categoryName]}</Text>
          </View>
        ))}
        <View style={singleStyles.recapRowTotal}>
        <Text style={singleStyles.recapContentTitle}>TOTAL :</Text>        
        <Text style={singleStyles.recapContent}>{total}€</Text>        
        </View>

        {/* Afficher le total */}
      </View>
      <KeyboardAvoidingView style={singleStyles.title}>
      <Text style={globalStyles.nusarTitle}>Mode de paiement</Text>
      <PaymentForm 
      addTicketToFirebase={addTicketToFirebase} 
      userId={userId} 
      eventId={eventId} 
      navigation={navigation}
      docSnap={docSnap}
      formatDate={formatDate} 
      ticketcounts={ticketCounts}
      ticketCategories={ticketCategories}
      />

      </KeyboardAvoidingView>
      
    </BottomSheetScrollView>
  );
};

export default BottomSheetComponent;

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