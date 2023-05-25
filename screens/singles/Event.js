import { Image, View, ActivityIndicator, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { globalStyles } from '../../styles/global';
import { useEffect, useState } from 'react';
import { Colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';


const Event = ({ route, navigation }) => {
  const { eventId } = route.params;
  const docRef = doc(db, 'events', eventId);
  const [docSnap, setDocSnap] = useState(null);
  const [loading, setLoading] = useState(true);




  async function takeTicket(userId, eventId) {
    const junctionRef = db.doc(`junction_users_events/${userId}_${eventId}`);
    await junctionRef.set({ userId, eventId });
    alert("Votre billet à été réservé")
  }

  const handleReservation = async () => { 
    const userId = auth.currentUser?.uid
    console.log("user id :",userId)
    console.log("event id :",eventId)
    takeTicket(userId, eventId)
    navigation.goBack()
  }
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
            <Image source={{
              uri: docSnap.data().image
              }} style={singleStyles.image}>
              </Image>

              <View style={singleStyles.metaContainer}>
                <Text style={globalStyles.nusarTitle}>{docSnap.data().title}</Text>
                <Text style={globalStyles.secondaryText}>{docSnap.data().eventType}</Text>
                <Text style={globalStyles.secondaryText}>{docSnap.data().capacity} places</Text>
                <Text style={globalStyles.secondaryText}>{docSnap.data().city} - {docSnap.data().salle}</Text>
                <Text style={globalStyles.secondaryText}>{formatDate(docSnap.data().date.seconds)}</Text>

              </View>
              <View style={singleStyles.description}>
              <Text style={singleStyles.text}>{docSnap.data().description}</Text>

              </View>

              <ScrollView contentContainerStyle={singleStyles.tickets}>
                <TouchableOpacity style={singleStyles.ticketCategory}>
                  <View style={singleStyles.ticketCategoryColLeft}>
                    <Text style={singleStyles.ticketTextBold}>Billet catégorie 1</Text>
                    <Text style={singleStyles.ticketText}>{docSnap.data().startingPrice} €</Text>
                  </View>
                  <View style={singleStyles.ticketCategoryColRight}>
                    <Text style={singleStyles.ticketTextBold}>Quantité</Text>
                    <Text style={singleStyles.ticketText}>{docSnap.data().capacity} restant</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={singleStyles.ticketCategory}>
                  <View style={singleStyles.ticketCategoryColLeft}>
                    <Text style={singleStyles.ticketTextBold}>Billet catégorie 2</Text>
                    <Text style={singleStyles.ticketText}>{docSnap.data().startingPrice} €</Text>
                  </View>
                  <View style={singleStyles.ticketCategoryColRight}>
                    <Text style={singleStyles.ticketTextBold}>Quantité</Text>
                    <Text style={singleStyles.ticketText}>{docSnap.data().capacity} restant</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={singleStyles.ticketCategory}>
                  <View style={singleStyles.ticketCategoryColLeft}>
                    <Text style={singleStyles.ticketTextBold}>Billet catégorie 3</Text>
                    <Text style={singleStyles.ticketText}>{docSnap.data().startingPrice} €</Text>
                  </View>
                  <View style={singleStyles.ticketCategoryColRight}>
                    <Text style={singleStyles.ticketTextBold}>Quantité</Text>
                    <Text style={singleStyles.ticketText}>{docSnap.data().capacity} restant</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>

<View style={globalStyles.buttonContainer}>
        <TouchableOpacity
        onPress={handleReservation}
        style={globalStyles.button}
        >
        <Text style={globalStyles.buttonText}>Réserver</Text>
        <Icon style={globalStyles.buttonIcon} name="ticket" size={20} color="black" />

        </TouchableOpacity>
</View>
      </View>
    </View>
  );
};

export default Event;

const singleStyles = StyleSheet.create({
    container:{
      height: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 15,
      paddingVertical: 25,
      justifyContent:'center'
    },
    metaContainer:{
      width: '65%',
      paddingHorizontal: 10
    },
    image: {
        width: '35%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15
    },
    text:{
      paddingVertical: 15,
      textAlign: 'left',
      color: Colors.primaryLight,
      fontFamily: 'Montserrat',
      fontSize: 16
    },
    tickets:{
      width: '100%',
      height: 200,
      marginVertical: 20

    },
    ticketCategory:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: 80,
      borderBottomWidth: 2,
      borderBottomColor: Colors.primaryLight,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      paddingHorizontal: 10
    },
    ticketCategoryColLeft:{
      width: '50%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    ticketCategoryColRight:{
      width: '50%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    ticketText:{
      textAlign: 'left',
      color: Colors.primaryLight,
      fontFamily: 'Montserrat',
      fontSize: 16
    },
    ticketTextBold:{
      textAlign: 'left',
      color: Colors.primaryLight,
      fontFamily: 'Montserrat-Bold',
      fontSize: 16,
    },
    description:{
      width: '100%'
    }
})